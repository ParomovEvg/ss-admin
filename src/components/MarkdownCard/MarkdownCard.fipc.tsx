import { MdDto } from '../../apiWorker/typings/index';
import { last } from 'lodash';
import { RootState } from '../../redux/createStore';
import { useSelector } from 'react-redux';
import { MarkdownCard$ } from './MarkdownCardComponent';
import { useState, useEffect, useCallback } from 'react';
import { useAction } from '../../hooks/use-action';
import {
  markdownActions,
  markdowmAsyncActions,
} from '../../redux/slices/markdownFieldSlice';
import React from 'react';

const useTranslate = (text: string) => {
  const array = text.split('\n');
  return array
    .map((row) => {
      const isH3 = /(### )/y;
      const isH2 = /(## )/y;
      const isH1 = /(# )/y;
      const isText = /[^<>]/gy;
      const isLink = /\[(.*?)\]\(.*?\)/;
      const isImg = /\{(.*?)\}\(.*?\)/;
      const imgSizeReGexp = /((?<=\)\()\d*?(?=\)))/g;
      const imgNameReGexp = /(?<=\{).*?(?=\})/;
      const linkReGexp = /(?<=\[).*?(?=\])/;
      const urlReGexp = /(?<=\().*?(?=\))/;
      if (isImg.test(row)) {
        const imgName = row.match(imgNameReGexp);
        const url = row.match(urlReGexp);
        const imgSize = row.match(imgSizeReGexp) ?? 0;
        const imgWidth = imgSize ? imgSize[0] : 150;
        const imgHeight = imgSize ? imgSize[1] : 150;
        row = row.replace(
          isImg,
          `<img src=${
            url ?? ''
          } width="${imgWidth}" height="${imgHeight}" title="${
            imgName ?? ''
          }" alt="${imgName ?? ''}"/>`
        );
      }
      if (isLink.test(row)) {
        const link = row.match(linkReGexp);
        const url = row.match(urlReGexp);
        row = row.replace(isLink, `<a href=${url ?? ''}>${link}</a>`);
      }
      if (isH3.test(row)) {
        row = row.replace('### ', ``);
        return `<h3 class="markdown__h1">${row}</h3>`;
      }
      if (isH2.test(row)) {
        row = row.replace('## ', ``);
        return `<h2 class="markdown__h1">${row}</h2>`;
      }
      if (isH1.test(row)) {
        row = row.replace('# ', ``);
        return `<h1 class="markdown__h1">${row}</h1>`;
      }
      if (row === '') {
        return `<div class="markdown__br"></div>`;
      }
      if (isText.test(row)) {
        return ` <span>${row}</span>`;
      }
      return row;
    })
    .join('\n');
};

const useSave = (
  values: MdDto[],
  text: string,
  id: number,
  lastValue: MdDto | undefined
) => {
  const isNotLastValue = last(values) !== lastValue;
  const isNotEmpty = text !== '';
  const [isSave, setIsSave] = useState(false);
  const addMarkdownValue_async = useAction(
    markdowmAsyncActions.addMarkdownValue_async
  );
  useEffect(() => {
    setIsSave(isNotEmpty && isNotLastValue);
  }, [isNotEmpty, isNotLastValue, text]);

  const onSave = useCallback(() => {
    addMarkdownValue_async(id);
  }, [addMarkdownValue_async, id]);

  return {
    isSave,
    onSave,
  };
};

const useReset = (
  text: string,
  setLastValue: any,
  values: MdDto[],
  id: number,
  lastValue: MdDto | undefined
) => {
  const [isReset, setIsReset] = useState(false);
  const isNotLastValue = last(values) !== lastValue;
  const clearMarkdownValue = useAction(markdownActions.clearMarkdownValue);
  const isNotEmpty = text !== '';

  useEffect(() => {
    setIsReset(isNotEmpty && isNotLastValue);
  }, [isNotEmpty, isNotLastValue]);

  const onReset = useCallback(() => {
    if (isReset) {
      clearMarkdownValue(id);
      setLastValue(last(values));
    }
  }, [clearMarkdownValue, id, isReset, setLastValue, values]);

  return {
    isReset,
    onReset,
  };
};

const useBack = (
  values: MdDto[],
  id: number,
  lastValue: MdDto | undefined,
  setLastValue: any
) => {
  const [isBack, setIsBack] = useState<boolean>(lastValue !== undefined);
  const setAddValueText = useAction(markdownActions.setAddValueText);

  useEffect(() => {
    setLastValue(last(values));
  }, [values, setLastValue]);

  useEffect(() => {
    if (lastValue !== undefined) {
      const prevIndex = values.indexOf(lastValue) - 1;
      setIsBack(values[prevIndex] !== undefined);
    }
  }, [values, lastValue]);

  const onBack = useCallback(async () => {
    if (lastValue !== undefined) {
      const prevIndex = values.indexOf(lastValue) - 1;
      const newLastValue = values[prevIndex];
      setLastValue(newLastValue);
      setAddValueText({
        id,
        text: newLastValue.value,
      });
    }
  }, [lastValue, values, setLastValue, setAddValueText, id]);
  return {
    onBack,
    isBack,
  };
};

export const MarkdownCard = MarkdownCard$({
  useMarkdown: (id) => {
    const isLoading = useSelector<RootState, boolean>(
      (state) =>
        state.markdowmField.items.find(
          (markdownField) => markdownField.id === id
        )?.isLoading ?? false
    );
    const name = useSelector<RootState, string>(
      (state) =>
        state.markdowmField.items.find(
          (markdownField) => markdownField.id === id
        )?.name ?? ''
    );
    const label = useSelector<RootState, string>(
      (state) =>
        state.markdowmField.items.find(
          (markdownField) => markdownField.id === id
        )?.label ?? ''
    );
    const values = useSelector<RootState, MdDto[]>(
      (state) =>
        state.markdowmField.items.find(
          (markdownField) => markdownField.id === id
        )?.values ?? []
    );
    const [lastValue, setLastValue] = useState(last(values));

    useEffect(() => {
      setLastValue(last(values));
    }, [values]);

    const addValueText = useSelector<RootState, string | undefined>(
      (state) =>
        state.markdowmField.items.find(
          (markdownField) => markdownField.id === id
        )?.addValueText
    );

    const setAddValueText = useAction(markdownActions.setAddValueText);
    const addValueTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAddValueText({
        id,
        text: e.target.value,
      });
    };

    const text = addValueText ?? lastValue?.value ?? '';
    const { isSave, onSave } = useSave(values, text, id, lastValue);
    const { isReset, onReset } = useReset(
      text,
      setLastValue,
      values,
      id,
      lastValue
    );
    const { onBack, isBack } = useBack(values, id, lastValue, setLastValue);
    const parseText = useTranslate(text);
    return {
      isLoading,
      name,
      label,
      text,
      parseText,
      addValueTextHandler,
      isSave,
      onSave,
      isReset,
      onReset,
      onBack,
      isBack,
    };
  },
});
