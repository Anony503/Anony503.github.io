(() => {
  // Replace placeholders with real values (or inject from your build/env step).
  const firebaseConfig = {
    apiKey: "AIzaSyBHLQCfQ2BxiYFhxDIHg-SdWWb2T7sCWig",
    authDomain: "solo-lev-a1afa.firebaseapp.com",
    projectId: "solo-lev-a1afa",
    storageBucket: "solo-lev-a1afa.firebasestorage.app",
    messagingSenderId: "577652670337",
    appId:  "1:577652670337:web:8dc087440d5e3d490b3280"
  };

  const hasConfig = Object.values(firebaseConfig).every((value) => (
    typeof value === "string" &&
    value.trim().length > 0 &&
    !value.trim().startsWith("__FIREBASE_")
  ));

  if (!hasConfig || !window.firebase) {
    window.FirebaseServices = null;
    window.FirebaseInitStatus = {
      ready: false,
      hasConfig,
      hasSdk: Boolean(window.firebase),
      reason: !hasConfig ? "Missing/placeholder firebaseConfig values." : "Firebase SDK not loaded."
    };
    return;
  }

  const app = window.firebase.apps && window.firebase.apps.length
    ? window.firebase.app()
    : window.firebase.initializeApp(firebaseConfig);

  window.FirebaseServices = {
    app,
    auth: window.firebase.auth(),
    db: window.firebase.firestore()
  };
  window.FirebaseInitStatus = {
    ready: true,
    hasConfig: true,
    hasSdk: true,
    reason: "Initialized"
  };

})();


