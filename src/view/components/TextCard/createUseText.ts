import { useCallback, useEffect, useState } from 'react';
import { Maybe, none, just, merge } from '@sweet-monads/maybe';
import { NotificationManager } from 'react-notifications';

export interface TextEntity {
  value: string;
  id: string;
}

export type UseTextField = () => {
  value?: string;
  onChange: (value: string) => void;
  onSave: () => void;
  isSave: boolean;
  onReset: () => void;
  isReset: boolean;
  onBack: () => void;
  isLoading: boolean;
};

export const createUseTextFiled = (
  getCurrent: () => Promise<TextEntity>,
  getLast: (text: TextEntity) => Promise<TextEntity>,
  save: (text: string) => Promise<TextEntity>
): UseTextField => {
  return () => {
    const [text, setText] = useState('');
    const [currentText, setCurrentText] = useState<Maybe<TextEntity>>(none);

    const { onBack, lastText, isBackLoading, setLastText } = useLastText(
      getLast
    );

    useEffect(() => {
      lastText.map((text) => setText(text.value));
    }, [lastText]);

    const isReset = useIsReset(text, currentText, lastText);
    const onReset = useCallback(() => {
      if (isReset) {
        currentText.map((cText) => {
          setText(cText.value);
          setLastText(just(cText));
        });
      }
    }, [currentText, isReset, setLastText]);

    const [isCurrentLoading, setIsCurrentLoading] = useState(false);
    const isSave = useIsSave(text, currentText);
    const onSave = useCallback(() => {
      if (isSave) {
        setIsCurrentLoading(true);
        save(text)
          .then((newCurrentText) => {
            setCurrentText(just(newCurrentText));
          })
          .catch((e) => NotificationManager.error(e.message))
          .finally(() => setIsCurrentLoading(false));
      }
    }, [isSave, text]);
    useEffect(() => {
      setIsCurrentLoading(true);
      getCurrent()
        .then((text) => {
          setCurrentText(just(text));
        })
        .catch((e) => NotificationManager.error(e.message))
        .finally(() => setIsCurrentLoading(false));
    }, []);
    useEffect(() => {
      currentText.map((text) => {
        setLastText(just(text));
        return text;
      });
    }, [currentText, setLastText]);

    return {
      isLoading: isBackLoading || isCurrentLoading,
      value: text,
      onChange: setText,
      isSave,
      onSave,
      isReset,
      onReset,
      onBack,
    };
  };
};

const useLastText = (getLast: (text: TextEntity) => Promise<TextEntity>) => {
  const [lastText, setLastText] = useState<Maybe<TextEntity>>(none);
  const [isBackLoading, setIsBackLoading] = useState(false);
  const onBack = useCallback(() => {
    setIsBackLoading(true);
    lastText.map((lastText) => {
      getLast(lastText)
        .then((newLastText) => {
          setLastText(just(newLastText));
        })
        .catch((e) => NotificationManager.error(e.message))
        .finally(() => setIsBackLoading(false));
    });
  }, [getLast, lastText]);

  return { lastText, setLastText, isBackLoading, onBack };
};

const useIsReset = (
  text: string,
  currentText: Maybe<TextEntity>,
  lastText: Maybe<TextEntity>
) => {
  const [isReset, setIsReset] = useState<boolean>(false);
  useEffect(() => {
    merge([lastText, currentText]).map(([lastT, currentT]) =>
      setIsReset(lastT.id !== currentT.id || text !== currentT.value)
    );
  }, [lastText, currentText, text]);
  return isReset;
};

const useIsSave = (text: string, currentText: Maybe<TextEntity>) => {
  const [isSave, setIsSave] = useState<boolean>(false);
  useEffect(() => {
    currentText.map((cText) => setIsSave(cText.value !== text));
  }, [text, currentText]);
  return isSave;
};
