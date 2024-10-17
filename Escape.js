// This could be useState, useOptimistic, or other state
let pending = false;

useEffect(() => {
  function beforeUnload(e: BeforeUnloadEvent) {
    if (!pending) return;
    e.preventDefault();
  }

  window.addEventListener('beforeunload', beforeUnload);

  return () => {
    window.removeEventListener('beforeunload', beforeUnload);
  };
}, [pending]);