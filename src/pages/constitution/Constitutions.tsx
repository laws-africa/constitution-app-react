import React from 'react';
import {
  withIonLifeCycle
} from '@ionic/react';
import './Constitution.css';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps<{ id: string; }> { }

class Constitutions extends React.Component<Props> {

}

export default withIonLifeCycle(Constitutions);