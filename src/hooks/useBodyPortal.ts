import { useEffect, useRef, useState } from 'react';

function useBodyPortal(id: string) {
  const targetRef = useRef<HTMLElement>();

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (document) {
      let target = document.getElementById(id) as HTMLElement;

      if (!target) {
        target = document.createElement('div');
        target.id = id;

        document.body.appendChild(target);
      }

      if (target) {
        targetRef.current = target;
        setReady(true);
      }
    }
  }, []);

  return {
    target: targetRef.current,
    ready,
  };
}

export default useBodyPortal;
