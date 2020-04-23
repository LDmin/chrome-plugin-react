import { useEffect, useState, useCallback } from 'react'

export default <T = any>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(defaultValue)
  useEffect(() => {
    chrome.storage.sync.get({ [key]: defaultValue }, (items) => {
      setValue(items[key])
    });
  }, [])

  const onChange = useCallback((v) => {
    setValue(v);
    chrome.storage.sync.set({ [key]: v });
  }, [])

  return [value, onChange] as [T, (v: T) => void]
}