import { useContext, useEffect, useState } from 'react';

// Setup
import { AppContext } from '../store';

// Types
import { TranslationsType } from '../types-and-interfaces/hooks/useTranslation.types';

/**
 * This hook returns the translations of the selected language.
 *
 * @param translationFor
 * Some specific property inside "translations: {}" object, located in the translation files.
 * If nothing is passed, the hole "translations: {}" object is returned.
 */

export default function useTranslation(
  translationFor?: string
): TranslationsType {
  const { language } = useContext(AppContext);
  const [translations, setTranslations] = useState<TranslationsType>({});

  useEffect(() => {
    setTranslations(language?.state.translations ?? {});
  }, [language]);

  return translations[translationFor ?? ''] ?? translations;
}
