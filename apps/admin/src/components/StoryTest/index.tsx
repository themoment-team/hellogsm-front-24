'use client';

import { useEffect, useState } from 'react';

const StoryTest = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(count);
  }, []);

  return <h1 className="text-orange-500">StoryTest</h1>;
};

export default StoryTest;
