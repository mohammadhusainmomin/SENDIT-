const productNotes = {
  "share-files-securely-without-email": {
    detail:
      "SendIt's current file flow accepts up to 20 files, up to 100 MB each. The sender chooses an expiry of up to 24 hours; the recipient enters the four-digit code on Receive File. Multiple files are downloaded individually, and active shares can be downloaded again.",
    example:
      "For a two-file handoff, upload both files together, choose an expiry that covers the recipient's schedule, then send the code separately from the message that explains what the files are.",
  },
  "encrypted-file-transfer-explained": {
    detail:
      "SendIt encrypts stored file content on the server using authenticated encryption, but it is not end-to-end encrypted: the service decrypts a file to deliver it. HTTPS protects the connection in transit; neither control prevents a recipient from copying a download.",
    example:
      "If a document must remain unreadable to the service provider, encrypt it yourself with a tool you trust before uploading, and share the decryption secret through a separate channel.",
  },
  "qr-code-file-sharing-guide": {
    detail:
      "SendIt currently creates a four-digit access code; it does not generate a QR code. A recipient opens the Receive File page and enters the code. Treat the code as a bearer credential and share it privately.",
    example:
      "When moving a file from a laptop to your phone, upload on the laptop, open senditsystem.in/receive on the phone, and type the code before the selected expiry.",
  },
  "file-expiry-and-auto-delete": {
    detail:
      "The selected expiry controls access: the receive API rejects a share once its expiry timestamp is reached. A scheduled cleanup removes stored file content separately, so access ending and physical deletion do not happen at the same guaranteed instant.",
    example:
      "If a recipient needs two hours, choose that window and send the deadline with the code. Keep your local copy; SendIt is not a backup service.",
  },
  "share-code-snippets-with-your-team": {
    detail:
      "Send Code lets the sender choose from 14 language options and an expiry. The recipient views a read-only, syntax-highlighted snippet. SendIt formats and displays code as text; it does not execute or validate it.",
    example:
      "For a bug handoff, share the smallest relevant snippet and the exact error message, remove credentials first, and tell the reviewer what behavior you expected.",
  },
  "temporary-access-codes-vs-links": {
    detail:
      "SendIt uses a four-digit code instead of a permanent public download URL. The code is not a high-assurance password: anyone who obtains it may try to access the active share, and expiry cannot undo a completed download.",
    example:
      "Send the code only to the intended recipient, use the shortest practical expiry, and ask them to confirm receipt. Normal file shares do not currently have a manual revoke control.",
  },
  "send-large-files-online": {
    detail:
      "The current SendIt upload limit is 100 MB per file and up to 20 files per transfer. Upload success can still depend on the connection, browser, hosting, and available storage; uploads are not resumable.",
    example:
      "Before sending a near-limit file, check its size, use a stable connection, keep the tab open until the success code appears, and confirm the recipient can open the downloaded copy.",
  },
  "file-sharing-mistakes-to-avoid": {
    detail:
      "A SendIt access code grants access to the active share, so do not post it publicly or include secrets in filenames. Recipients may save or forward a download, and normal shares cannot currently be manually revoked.",
    example:
      "Before upload, remove unnecessary personal data, use a neutral filename, verify the recipient, send the code privately, and keep a separate original until they confirm receipt.",
  },
  "anonymous-file-sharing-explained": {
    detail:
      "A basic SendIt transfer can be created without signing in, but that does not make the activity anonymous. The service processes technical and transfer data described in its Privacy Policy, and an access code is not identity verification.",
    example:
      "If you do not need account history, guest sharing avoids creating an account; do not infer that it hides your identity from the service or replaces an approved confidential-transfer process.",
  },
  "file-sharing-for-students": {
    detail:
      "For a normal SendIt share, students can upload up to 20 files (100 MB each), choose an expiry up to 24 hours, and give the recipient the four-digit code. It is a transfer flow, not a long-term submission archive.",
    example:
      "For a group-project handoff, agree on the final filenames first, upload the deliverables together, choose an expiry that covers the review, and ask a teammate to confirm the download.",
  },
  "how-file-upload-works": {
    detail:
      "In SendIt, the browser submits selected files to the backend, which encrypts file content before storage and records an expiry. The receive API checks the code and expiry before returning a file. The current upload flow does not resume an interrupted transfer.",
    example:
      "If a large upload fails, check the connection and file-size limit, then retry from a stable network. Do not assume the code exists until the upload reports success.",
  },
  "cloud-storage-vs-file-transfer": {
    detail:
      "SendIt is designed for short-lived handoffs: up to 20 files per normal transfer, expiry up to 24 hours, and no folders, version history, or normal manual revoke control. Use a managed storage service when people need ongoing access.",
    example:
      "Use SendIt to pass a draft for review, then move the accepted version into the team's normal shared workspace rather than relying on an expiring code as the project record.",
  },
  "password-protect-shared-files": {
    detail:
      "SendIt's normal file-sharing flow does not add a user-chosen password to a file. Access is controlled by the four-digit code and expiry, and the code should not be treated as strong authentication.",
    example:
      "If a file requires a separate encryption password, encrypt it with a trusted local tool before upload and send that password through a different channel from the SendIt access code.",
  },
  "receive-files-from-clients-safely": {
    detail:
      "SendIt Drop Rooms let an authenticated room owner request named documents and review submissions. A submitter's email can submit to a room only once; the room owner should still verify received files and move needed copies into their own approved storage.",
    example:
      "For a client intake, list only the documents actually needed, give a clear deadline, and tell the client how to contact you if a required file is missing or rejected.",
  },
  "why-links-expire-security": {
    detail:
      "SendIt checks the stored expiry before allowing a receive request; expired codes no longer return the shared content. The cleanup scheduler removes stored files later, and there is no normal manual revoke endpoint for a live file share.",
    example:
      "Choose enough time for the recipient's real schedule, tell them the deadline, and create a new share if it expires before collection. Do not use expiry as a substitute for immediate revocation.",
  },
  "file-sharing-etiquette-for-remote-teams": {
    detail:
      "SendIt can handle a short team handoff, but it does not provide shared folders, comments, version history, or a permanent project record. Files in one transfer share an access code and can be downloaded individually while active.",
    example:
      "Put the purpose, requested action, and deadline in the team message alongside the code; after review, store the accepted deliverable in the team's managed workspace.",
  },
};

module.exports = productNotes;
