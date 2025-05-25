import { useState, useEffect } from "react";

export const BackendStatusNotice = () => {
  const [showNotice, setShowNotice] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotice(false);
    }, 120000); 

    return () => clearTimeout(timer); 
  }, []);

  return (
    showNotice && (
      <div className="w-full bg-yellow-100 border-b border-yellow-300 text-yellow-800 text-center py-3 z-50">
        <p>
          <strong>Notice:</strong> The server may experience a brief cold start delay of up to 2 minutes if it has been idle. Thank you for your understanding.
        </p>
      </div>
    )
  );
};
