<?php

namespace App\Notifications;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Auth\Notifications\ResetPassword;

class CustomResetPassword extends ResetPassword
{
    public function toMail($notifiable): MailMessage
    {
        $url = $this->resetUrl($notifiable);
        return (new MailMessage)
            ->subject('Your password reset link')
            ->view('emails.reset-password', ['url' => $url, 'title' => 'You have requested to reset your password', 'user' => $notifiable]);
    }
}
