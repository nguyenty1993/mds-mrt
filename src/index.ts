import Button from './components/atoms/button';
import Container from './components/atoms/container';
import Grid from './components/atoms/grid';
import Input from './components/atoms/input';
import Select from './components/atoms/select';
import Link from './components/atoms/link';
import Tooltip from './components/atoms/tooltip';
import Typography from './components/atoms/typography';
import Card from './components/atoms/card';
import Checkbox from './components/atoms/checkbox';
import Radio from './components/atoms/radio';
import Modal from './components/atoms/modal';
import CurvedLine from './components/atoms/curved-line';
import DiamondTile from './components/atoms/diamond-tile';
import NiceDashed from './components/atoms/nice-dashed';
import FixedBottom from './components/atoms/fixed-bottom';
import Divider from './components/atoms/divider';
import Arrow from './components/atoms/arrow';
import Collapse from './components/atoms/collapse';

import OtpInput from './components/molecules/otp-input';
import MenuItem from './components/molecules/menu/components/menu-item';
import { MenuDesktop, MenuMobile } from './components/molecules/menu';
import CurriculumCard from './components/molecules/curriculum-card';
import Drawer from './components/molecules/drawer';

import Footer from './components/organisms/footer';
import Header from './components/organisms/header';
import Contact from './components/organisms/contact';
import CurriculumList from './components/organisms/curriculum-list';

import { respondTo, theme, breakpointCssFactory } from './utils';

import styled, {
  ThemeProvider,
  ServerStyleSheet,
  StyleSheetManager,
} from 'styled-components';

export {
  // atoms
  Button,
  Container,
  Grid,
  Input,
  Select,
  Link,
  Tooltip,
  Typography,
  Card,
  Checkbox,
  Modal,
  CurvedLine,
  DiamondTile,
  NiceDashed,
  FixedBottom,
  Divider,
  Radio,
  Arrow,
  Collapse,

  // molecules
  OtpInput,
  MenuItem,
  MenuDesktop,
  MenuMobile,
  CurriculumCard,
  Drawer,

  // organisms
  Footer,
  Header,
  Contact,
  CurriculumList,

  // utils
  theme,
  respondTo,
  breakpointCssFactory,

  // re-export styled
  ThemeProvider,
  styled,
  ServerStyleSheet,
  StyleSheetManager,
};
