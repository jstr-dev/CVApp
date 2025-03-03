<title>{{ $emailTitle ?? '' }}</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="x-apple-disable-message-reformatting" content="" />
<meta content="target-densitydpi=device-dpi" name="viewport" />
<meta content="true" name="HandheldFriendly" />
<meta content="width=device-width" name="viewport" />
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />

<style type="text/css">
    /* Base styles */
    body {
        min-width: 100%;
        margin: 0;
        padding: 0;
        background-color: #f5f7fa;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    /* Tables */
    table {
        border-collapse: separate;
        table-layout: fixed;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
    }

    table td {
        border-collapse: collapse;
    }

    /* Email container */
    .email-container {
        background-color: #f5f7fa;
    }

    .email-content {
        font-size: 0;
        line-height: 0;
        bbackground-color: #f5f7fa;
    }

    /* Spacing */
    .top-spacing {
        line-height: 100px;
        font-size: 1px;
        display: block;
    }

    .bottom-spacing {
        line-height: 80px;
        font-size: 1px;
        display: block;
    }

    .spacing-small {
        line-height: 20px;
        font-size: 1px;
        display: block;
    }

    .spacing-xsmall {
        line-height: 10px;
        font-size: 1px;
        display: block;
    }

    .spacing-medium {
        line-height: 30px;
        font-size: 1px;
        display: block;
    }

    /* Content */
    .content-container {
        background-color: #FFFFFF;
        width: 600px;
        border-radius: 0 0 14px 14px;
    }

    .content-padding {
        padding: 40px 30px 40px 30px;
    }

    /* Header */
    .header-container {
        background-color: #CDD6B0;
        width: 600px;
        border-radius: 14px 14px 0 0;
    }

    /* Button */
    .button-container {
        background-color: #CDD6B0;
        width: 130px;
        border-radius: 10px;
    }

    /* Typography */
    h1,
    h2,
    h3,
    p,
    a {
        font-family: Albert Sans, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial, sans-serif;
        color: #111111;
        text-align: left;
        margin: 0;
    }

    h1 {
        font-size: 24px;
        line-height: 32px;
        font-weight: 700;
    }

    h2 {
        font-size: 20px;
        line-height: 28px;
        font-weight: 700;
    }

    h3 {
        font-size: 16px;
        line-height: 24px;
        font-weight: 700;
    }

    p {
        font-size: 14px;
        line-height: 24px;
        font-weight: 400;
    }

    .footer p {
        color: #878787;
    }

    a {
        color: #292929;
        text-decoration: none;
    }

    .signature {
        font-weight: 700;
    }

    /* Gmail fix */
    .gmail-fix {
        display: none;
        white-space: nowrap;
        font: 15px courier;
        line-height: 0;
    }

    /* External Class Fix */
    .ExternalClass {
        width: 100%;
    }

    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
        line-height: 100%;
    }

    /* Mobile */
    @media (min-width: 481px) {
        .hd {
            display: none !important;
        }
    }

    @media (max-width: 480px) {
        .hm {
            display: none !important;
        }

        .mobile-container {
            width: 480px !important;
        }

        .spacing-none {
            line-height: 0 !important;
            display: none !important;
        }

        .mobile-container-radius-top {
            border-top-left-radius: 0 !important;
            border-top-right-radius: 0 !important;
        }

        .mobile-container-radius-bottom {
            border-bottom-right-radius: 0 !important;
            border-bottom-left-radius: 0 !important;
        }

        .mobile-content {
            width: 420px !important;
        }
    }

    .button-table {
        margin-right: auto;
    }

    .button-cell {
        text-align: center;
        line-height: 24px;
        padding: 10px;
    }

    .button {
        display: block;
        margin: 0;
        font-family: Albert Sans, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial, sans-serif;
        line-height: 24px;
        font-weight: 700;
        font-size: 14px;
        text-decoration: none;
        color: #292929;
        text-align: center;
    }

    /* Header styling */
    .header-wrapper,
    .content-wrapper {
        margin-left: auto;
        margin-right: auto;
    }

    .header-content {
        padding: 40px 0 40px 0;
    }

    .logo-table {
        margin-left: auto;
        margin-right: auto;
    }

    .logo-cell {
        width: 60px;
    }

    .logo-wrapper {
        font-size: 0px;
    }

    .logo {
        display: block;
        border: 0;
        height: auto;
        width: 100%;
        margin: 0;
        max-width: 100%;
    }

    /* Footer styling */
    .footer-cell {
        padding: 20px 30px 20px 30px;
    }

    .footer-text {
        text-align: center;
        color: #878787
    }
</style>

<link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;700&amp;display=swap" rel="stylesheet"
    type="text/css" />
