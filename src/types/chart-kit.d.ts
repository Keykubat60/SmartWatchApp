declare module 'react-native-chart-kit' {
  import { ViewStyle } from 'react-native';

  interface ChartConfig {
    backgroundColor?: string;
    backgroundGradientFrom?: string;
    backgroundGradientTo?: string;
    decimalPlaces?: number;
    color?: (opacity?: number) => string;
  }

  interface Dataset {
    data: number[];
  }

  interface LineChartData {
    labels: string[];
    datasets: Dataset[];
  }

  interface LineChartProps {
    data: LineChartData;
    width: number;
    height: number;
    chartConfig: ChartConfig;
    bezier?: boolean;
    style?: ViewStyle;
  }

  export class LineChart extends React.Component<LineChartProps> {}
} 