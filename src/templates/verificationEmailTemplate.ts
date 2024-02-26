const verificationEmailTemplate = (url: string): string => {
  return `
      <h1 style="color: black; font-size: 40px; text-align:center">No Brand Store Department</h1>
      <div style="color: black; font-size: 20px; text-align:justify;">
        <p>
          Your account as sales assistance of No Brand store has been successfully created. Firstly, you have to access our website from the link attached below for account activation.
        </p>
        <p>
          The user name and password before the account activation is both the name of your registered email. After logged in, you are required to provide the new password for more security.
        </p>
        <p>
          The link attached below is only valid within 10 minutes from since this email sent to you. After this time, you have to contact the administrator of your store branch to re-send the verification email.
        </p>
      </div>
      <a  href="${url}" 
          style="color: blue; font-size: 20px; text-align:center;">
        Verify your account through this link.
      </a>
      <div style="color: black; font-size: 20px; text-align:right;">
        <p>Sincerely, thanks for your participation.</p>
        <p>No Brand store department.</p>
      </div>
  `;
};

export { verificationEmailTemplate };
