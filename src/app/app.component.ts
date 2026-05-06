import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RowClassArgs } from '@progress/kendo-angular-grid';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { GridModule } from '@progress/kendo-angular-grid';
import { LayoutModule, CardModule } from '@progress/kendo-angular-layout';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ChartsModule,
    GridModule,
    LayoutModule,
    CardModule,
    IndicatorsModule,
    ButtonsModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  selectedPeriod = 'monthly';

  kpis = [
    { title: 'Receita Total',  value: 'R$ 847.320', change: '+12,4%', up: true,  icon: '💰', color: '#7C6FFF' },
    { title: 'Pedidos',        value: '3.284',      change: '+8,1%',  up: true,  icon: '📦', color: '#00C6A2' },
    { title: 'Ticket Médio',   value: 'R$ 257,98',  change: '-2,3%',  up: false, icon: '🧾', color: '#FF6B6B' },
    { title: 'Novos Clientes', value: '482',        change: '+15,7%', up: true,  icon: '👥', color: '#FFA94D' },
  ];

  revenueCategories = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  revenueSeries     = [620000,580000,710000,695000,760000,820000,847320,790000,870000,910000,950000,1020000];
  metaSeries        = [600000,620000,650000,670000,700000,750000,800000,820000,840000,860000,900000,950000];

  categoryData = [
    { category: 'Eletrônicos',   value: 35 },
    { category: 'Moda',          value: 22 },
    { category: 'Casa & Jardim', value: 18 },
    { category: 'Esportes',      value: 14 },
    { category: 'Outros',        value: 11 },
  ];

  topSellers = [
    { rank: 1, name: 'Ana Paula Silva', region: 'São Paulo',      vendas: 412, receita: 'R$ 148.320', meta: 95 },
    { rank: 2, name: 'Carlos Henrique', region: 'Rio de Janeiro', vendas: 387, receita: 'R$ 132.540', meta: 88 },
    { rank: 3, name: 'Mariana Costa',   region: 'Belo Horizonte', vendas: 356, receita: 'R$ 121.890', meta: 82 },
    { rank: 4, name: 'Roberto Lima',    region: 'Curitiba',       vendas: 318, receita: 'R$ 108.270', meta: 76 },
    { rank: 5, name: 'Fernanda Souza',  region: 'Porto Alegre',   vendas: 294, receita: 'R$ 99.840',  meta: 71 },
    { rank: 6, name: 'Lucas Oliveira',  region: 'Brasília',       vendas: 271, receita: 'R$ 92.140',  meta: 65 },
    { rank: 7, name: 'Patrícia Gomes',  region: 'Salvador',       vendas: 248, receita: 'R$ 84.320',  meta: 60 },
    { rank: 8, name: 'André Santos',    region: 'Recife',         vendas: 226, receita: 'R$ 76.980',  meta: 55 },
  ];

  weekdayCategories = ['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];
  weekdaySales      = [142, 185, 167, 210, 243, 310, 198];

  getMetaColor(value: number): string {
    if (value >= 85) return '#00C6A2';
    if (value >= 70) return '#FFA94D';
    return '#FF6B6B';
  }

  rowCallback = (context: RowClassArgs) => ({
    'top-row': context.index === 0,
  });
}