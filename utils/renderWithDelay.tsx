import { useState, useEffect } from "react";

const RenderWithDelay = ({ delay, children }: { delay: number; children: React.ReactNode }) => {
    const [render, setRender] = useState(false);
    
    useEffect(() => {
      const t = setTimeout(() => setRender(true), delay);
      return () => clearTimeout(t);
    }, [render])

    return render && children;
}
 
export default RenderWithDelay;