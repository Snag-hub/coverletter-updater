'use client';

import { useState, useEffect } from 'react';

export function useCoverLetter() {
  const [user, setUser] = useState(null);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    // Load saved templates from local storage (future feature)
    const savedTemplates = localStorage.getItem('coverLetterTemplates');
    if (savedTemplates) {
      setTemplates(JSON.parse(savedTemplates));
    }
  }, []);

  return { user, setUser, templates, setTemplates };
}