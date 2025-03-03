<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
    @include('emails.partials.head')
</head>
<body id="email-body" class="email-wrapper">
    <div class="email-container">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center">
            <tr>
                <td class="email-content" valign="top" align="center">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" id="innerTable">
                        <!-- Top spacing -->
                        <tr>
                            <td>
                                <div class="top-spacing">&nbsp;</div>
                            </td>
                        </tr>

                        <!-- Header -->
                        <tr>
                            <td align="center">
                                @include('emails.partials.header', ['logoUrl' => $logoUrl ?? asset('images/1.png')])
                            </td>
                        </tr>

                        <!-- Main Content -->
                        <tr>
                            <td align="center">
                                <table class="content-wrapper" role="presentation" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td class="content-container">
                                            <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                                                <tr>
                                                    <td class="content-padding">
                                                        @if ($title ?? false)
                                                            <h2>{{$title}}</h2>
                                                            <div class="spacing-medium">&nbsp;</div>
                                                        @endif

                                                        <!-- Main content -->
                                                        @yield('content')

                                                        <!-- Spacing -->
                                                        <div class="spacing-medium">&nbsp;</div>

                                                        <!-- Thanks line -->
                                                        <p>Thank you!</p>

                                                        <!-- Signature -->
                                                        <p class="signature">{{ $footerSignature ?? 'The Team' }}</p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td align="center">
                                @include('emails.partials.footer', ['address' => $footerAddress ?? ''])
                            </td>
                        </tr>

                        <!-- Bottom spacing -->
                        <tr>
                            <td>
                                <div class="bottom-spacing">&nbsp;</div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>

    <!-- Fix for Gmail -->
    <div class="gmail-fix">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div>
</body>
</html>
