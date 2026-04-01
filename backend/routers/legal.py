from fastapi import APIRouter
from fastapi.responses import HTMLResponse

router = APIRouter(tags=["Legal"])

PRIVACY_POLICY_HTML = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Privacy Policy - Wonder Words Quest</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: #fff;
            border-radius: 16px;
            padding: 40px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        }
        h1 {
            color: #1a1a2e;
            font-size: 2em;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .logo { font-size: 1.5em; }
        .last-updated {
            color: #7f8c8d;
            font-size: 0.9em;
            margin-bottom: 30px;
            font-style: italic;
        }
        h2 {
            color: #2c3e50;
            font-size: 1.4em;
            margin-top: 30px;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 2px solid #3498db;
        }
        h3 {
            color: #34495e;
            font-size: 1.1em;
            margin-top: 20px;
            margin-bottom: 10px;
        }
        p { margin-bottom: 15px; }
        ul {
            margin-left: 25px;
            margin-bottom: 15px;
        }
        li { margin-bottom: 8px; }
        .highlight {
            background: #e8f4f8;
            padding: 15px;
            border-radius: 10px;
            border-left: 4px solid #3498db;
            margin: 20px 0;
        }
        .highlight.warning {
            background: #fdf2f2;
            border-left-color: #e74c3c;
        }
        .highlight.success {
            background: #e8f8e8;
            border-left-color: #27ae60;
        }
        .contact {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin-top: 30px;
            text-align: center;
        }
        .contact a {
            color: #3498db;
            text-decoration: none;
            font-weight: bold;
        }
        footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ecf0f1;
            color: #7f8c8d;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1><span class="logo">🌍</span> Privacy Policy</h1>
        <p class="last-updated">Last Updated: March 31, 2025</p>
        
        <p>Welcome to <strong>Wonder Words Quest</strong>. This Privacy Policy explains how we collect, use, and protect your information when you use our word puzzle game. We are committed to protecting your privacy and complying with applicable data protection laws including GDPR, CCPA, and COPPA.</p>

        <div class="highlight success">
            <strong>🛡️ Your Privacy Matters</strong><br>
            We do not sell your personal information. We collect only what's necessary to provide you with a great gaming experience.
        </div>

        <h2>🇪🇺 GDPR Compliance (EU Users)</h2>
        <p>If you are located in the European Economic Area (EEA), you have specific rights under the General Data Protection Regulation (GDPR):</p>
        <ul>
            <li>Right to access your personal data</li>
            <li>Right to rectification of inaccurate data</li>
            <li>Right to erasure ("right to be forgotten")</li>
            <li>Right to restrict processing</li>
            <li>Right to data portability</li>
            <li>Right to object to processing</li>
            <li>Right to withdraw consent at any time</li>
        </ul>

        <h2>👨‍👩‍👧‍👦 Children's Privacy (COPPA Compliance)</h2>
        <div class="highlight warning">
            <strong>Important for Parents:</strong> Wonder Words Quest is designed for players of all ages, including children under 13. We comply with the Children's Online Privacy Protection Act (COPPA).
        </div>
        <ul>
            <li>We do not knowingly collect personal information from children under 13 without parental consent</li>
            <li>Ads shown to children are age-appropriate and limited</li>
            <li>We do not allow behavioral advertising for child users</li>
            <li>Parents can contact us to review or delete their child's data</li>
        </ul>

        <h2>📊 Information We Collect</h2>
        
        <h3>Game Progress Data</h3>
        <ul>
            <li>Current level and completed levels</li>
            <li>Coins, hints, and in-game achievements</li>
            <li>Words discovered in each level</li>
        </ul>

        <h3>Account Information (Optional)</h3>
        <ul>
            <li>Email address (if you create an account)</li>
            <li>Display name (if you choose to set one)</li>
        </ul>

        <h3>Device Information</h3>
        <ul>
            <li>Anonymous device identifier for game progress</li>
            <li>Device type and operating system</li>
            <li>IP address (for analytics and fraud prevention)</li>
        </ul>

        <h2>🎯 How We Use Your Information</h2>
        <ul>
            <li>To save and sync your game progress</li>
            <li>To display leaderboards and rankings</li>
            <li>To show age-appropriate advertisements</li>
            <li>To improve our game and fix issues</li>
            <li>To send game-related notifications (with your permission)</li>
            <li>To prevent fraud and ensure security</li>
        </ul>

        <h2>📺 Advertising Partners</h2>
        <p>We display advertisements to support our free game. We work with the following advertising partners:</p>

        <h3>Google AdMob</h3>
        <p>We use Google AdMob to display advertisements. AdMob may collect and use data in accordance with Google's Privacy Policy.</p>
        <ul>
            <li>Privacy Policy: <a href="https://policies.google.com/privacy" target="_blank">https://policies.google.com/privacy</a></li>
            <li>Opt-out: <a href="https://adssettings.google.com" target="_blank">https://adssettings.google.com</a></li>
        </ul>

        <h3>Ad Types Used</h3>
        <ul>
            <li><strong>Rewarded Video Ads</strong> - Optional, you choose to watch for rewards</li>
            <li><strong>Interstitial Ads</strong> - Shown between levels only (every 3 levels)</li>
        </ul>
        <p>We do NOT show ads that cover buttons, trick users into clicking, or appear every few seconds. All ads respect user experience.</p>

        <h3>Data Collected by Ad Partners</h3>
        <ul>
            <li>Device identifiers (Advertising ID)</li>
            <li>IP address</li>
            <li>Device and app information</li>
            <li>Ad interaction data</li>
        </ul>

        <h2>🔄 Data Sharing</h2>
        <p>We do not sell your personal information. We may share data with:</p>
        <ul>
            <li>Service providers who help operate our game</li>
            <li>Advertising partners (Google AdMob) - limited data for ad serving</li>
            <li>Analytics providers to improve our service</li>
            <li>Legal authorities if required by law</li>
        </ul>

        <h2>⏰ Data Retention</h2>
        <ul>
            <li><strong>Game progress:</strong> Until you delete your account or request deletion</li>
            <li><strong>Account data:</strong> Until account deletion</li>
            <li><strong>Analytics data:</strong> Up to 26 months</li>
            <li><strong>Ad interaction data:</strong> As per our partners' policies</li>
        </ul>

        <h2>🔒 Data Security</h2>
        <p>We implement appropriate security measures to protect your information:</p>
        <ul>
            <li>Encryption in transit (HTTPS/TLS)</li>
            <li>Secure data storage</li>
            <li>Regular security audits</li>
            <li>Access controls and authentication</li>
        </ul>

        <h2>⚖️ Your Rights</h2>
        <p>Depending on your location, you have the right to:</p>
        <ul>
            <li>Access your personal data</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of personalized advertising</li>
            <li>Data portability (receive your data in a portable format)</li>
            <li>Withdraw consent at any time</li>
            <li>Lodge a complaint with a supervisory authority (EU users)</li>
        </ul>

        <h2>🌐 International Data Transfers</h2>
        <p>Your data may be transferred to and processed in countries outside your jurisdiction. We ensure appropriate safeguards are in place, including Standard Contractual Clauses (SCCs) for EU data transfers.</p>

        <h2>📝 Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of any significant changes through the app or by other means. Continued use of the app after changes constitutes acceptance of the updated policy.</p>

        <div class="contact">
            <h2>📧 Contact Us</h2>
            <p>If you have questions about this Privacy Policy, wish to exercise your rights, or have concerns about our data practices, please contact us:</p>
            <p><a href="mailto:privacy@wonderwordsquest.app">privacy@wonderwordsquest.app</a></p>
        </div>

        <footer>
            <p>© 2025 Wonder Words Quest. All rights reserved.</p>
            <p>App Version 1.0.0</p>
        </footer>
    </div>
</body>
</html>
"""

@router.get("/privacy-policy", response_class=HTMLResponse)
async def get_privacy_policy():
    """Returns the privacy policy HTML page"""
    return PRIVACY_POLICY_HTML

@router.get("/privacy", response_class=HTMLResponse)
async def get_privacy_short():
    """Short URL redirect to privacy policy"""
    return PRIVACY_POLICY_HTML
