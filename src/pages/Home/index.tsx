import {observer} from 'mobx-react-lite';
import React, {useEffect} from 'react';
import {useStore} from '~/store/hooks';
import {Timer} from '~/store/Timer/types';

import * as S from './styles';

export const Home = observer(() => {
  const timer = useStore('timer') as Timer;

  useEffect(() => {
    setInterval(() => {
      timer?.increaseTimer();
    }, 1000);
  }, [timer]);

  return (
    <S.Container>
      <S.TimeText>Timer: {timer?.secondsPassed}</S.TimeText>
    </S.Container>
  );
});
