<?php

namespace App\Services;
use App\Exceptions\InvalidStatusException;
use App\Models\ApplicationEvent;
use App\Models\Cover;
use App\Models\CV;
use App\Models\User;
use App\Models\Application;
use Exception;
use Illuminate\Support\Collection;

class ApplicationService 
{
    private const STATUS_MAP = [
        'pending' => 'created',
        'success' => 'succeeded',
        'declined' => 'declined',
        'acknowledged' => 'acknowledged'
    ];

    public function create(string $jobTitle, string $platform, string $url, User $user, CV $cv, ?Cover $cover = null, ?array $attributes = null): Application
    {
        $application = new Application();

        if ($attributes) {
            $application->fill($attributes);
        }

        $application->user_id = $user->id;
        $application->cv_id = $cv->id;
        $application->cover_id = $cover?->id;
        $application->platform = $platform;
        $application->url = $url;
        $application->job_title = $jobTitle;
        $application->save();

        $this->createStatusEvent($application, 'created');

        return $application;
    }
    
    public function updateStatus(Application $application, string $status): void
    {
        $application->status = $status;
        $application->save();
        
        $this->createStatusEvent($application, self::STATUS_MAP[$status] ?? $status);
    }

    public function getByUser(User $user, ?array $statuses): Collection
    {
        return Application::query()
            ->where('user_id', '=', $user->id)
            ->when($statuses, function ($query) use ($statuses) {
                return $query->whereIn('status', $statuses);
            })
            ->get();
    }

    private function createStatusEvent(Application $application, string $status): void
    {
        $event = new ApplicationEvent();
        $event->application_id = $application->id;
        $event->status = $status;

        try {
            $event->save();
        } catch (Exception $e) {
            throw new InvalidStatusException($status);
        }
    }
}