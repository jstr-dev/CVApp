@extends('emails.layouts.main')

@section('content')
    <p>Hey, {{ $user->first_name }}!</p>
    <div class="spacing-small">&nbsp;</div>
    <p>You are receiving this email because we received a password reset request for your account.</p>
    <div class="spacing-xsmall">&nbsp;</div>
    <p>If you did not request a password reset, please contact support immediately.</p>
    <div class="spacing-small">&nbsp;</div>
    @include('emails.partials.button', ['url' => $url, 'text' => 'Reset Password'])
@endsection
