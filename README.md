# 📦 Kendo UI for Angular — Guia de Componentes e Temas

> Referência prática para o projeto **Dashboard de Vendas** com Kendo UI for Angular.

---

## 📋 Sumário

- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Modificar o Tema Default](#modificar-o-tema-default)
  - [1. Variáveis CSS (mais rápido)](#1-variáveis-css-mais-rápido)
  - [2. Variáveis SCSS (mais controle)](#2-variáveis-scss-mais-controle)
  - [3. ThemeBuilder (visual, sem código)](#3-themebuilder-visual-sem-código)
  - [4. Trocar tema em runtime](#4-trocar-tema-em-runtime)
- [Componentes — Instalação e Uso](#componentes--instalação-e-uso)
  - [Charts (Gráficos)](#charts-gráficos)
  - [Grid (Tabela de Dados)](#grid-tabela-de-dados)
  - [Buttons (Botões)](#buttons-botões)
  - [Indicators (Badge, Loader)](#indicators-badge-loader)
  - [Date Inputs (DatePicker, TimePicker)](#date-inputs-datepicker-timepicker)
  - [DropDowns (DropDownList, ComboBox)](#dropdowns-dropdownlist-combobox)
  - [Inputs (TextBox, NumericTextBox)](#inputs-textbox-numerictextbox)
  - [Dialogs (Modal, Window)](#dialogs-modal-window)
  - [Notification (Toast)](#notification-toast)
  - [ProgressBar](#progressbar)
  - [Tooltip](#tooltip)
  - [Layout (Splitter, StackLayout)](#layout-splitter-stacklayout)

---

## Estrutura do Projeto

```
src/
├── app/
│   ├── app.component.ts       # Lógica + dados
│   ├── app.component.html     # Template com componentes Kendo
│   └── app.component.scss     # Estilos customizados
├── styles.scss                # Import do tema global Kendo
└── main.ts                    # Bootstrap com provideAnimations()
```

**Dependências-chave no `package.json`:**
```json
{
  "@progress/kendo-angular-charts": "...",
  "@progress/kendo-angular-grid": "...",
  "@progress/kendo-angular-buttons": "...",
  "@progress/kendo-angular-indicators": "...",
  "@progress/kendo-angular-layout": "...",
  "@progress/kendo-theme-default": "..."
}
```

---

## Pré-requisitos

Todos os componentes Kendo precisam de animações do Angular. Certifique-se que `main.ts` contém:

```typescript
// main.ts
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [provideAnimations()]
});
```

---

## Modificar o Tema Default

### 1. Variáveis CSS (mais rápido)

Sem recompilar nada. Adicione no `styles.scss` **antes** do import do tema:

```scss
// styles.scss
:root {
  --kendo-color-primary:        #7C6FFF;
  --kendo-color-primary-hover:  #6a5ef0;
  --kendo-border-radius-md:     10px;
  --kendo-font-family:          'Sora', sans-serif;
  --kendo-font-size:            13px;
  --kendo-color-base-bg:        #18181F;
  --kendo-color-on-base:        #E8E8F0;
}

@use '@progress/kendo-theme-default/dist/all.css';
```

**Variáveis mais usadas:**

| Variável | Descrição |
|---|---|
| `--kendo-color-primary` | Cor principal (botões, seleções) |
| `--kendo-color-base-bg` | Background de componentes |
| `--kendo-border-radius-md` | Arredondamento geral |
| `--kendo-font-family` | Fonte dos componentes |
| `--kendo-color-on-base` | Cor do texto sobre fundo base |

---

### 2. Variáveis SCSS (mais controle)

Substitua o import do CSS compilado pelo source SCSS:

```bash
# As variáveis SCSS ficam no pacote já instalado
npm install @progress/kendo-theme-default
```

```scss
// styles.scss — use variáveis ANTES do @use
$kendo-color-primary:       #7C6FFF;
$kendo-color-primary-hover: #6a5ef0;
$kendo-border-radius-md:    10px;
$kendo-font-family:         'Sora', sans-serif;

// Troca o import do CSS pelo SCSS fonte
@use '@progress/kendo-theme-default/scss/all';
```

No `angular.json`, garanta que o SCSS é processado:
```json
"styles": [
  "src/styles.scss"
],
"stylePreprocessorOptions": {
  "includePaths": ["node_modules"]
}
```

---

### 3. ThemeBuilder (visual, sem código)

1. Acesse **https://themebuilder.telerik.com/**
2. Escolha *Telerik & Kendo UI → Default*
3. Altere cores, fontes e bordas com preview em tempo real
4. Clique em **Export** → baixe o `.css`
5. Coloque o arquivo em `src/assets/kendo-custom-theme.css`
6. Atualize o `angular.json`:

```json
"styles": [
  "src/assets/kendo-custom-theme.css",
  "src/styles.scss"
]
```

> **Dica:** Remova o import do tema padrão do `styles.scss` após adicionar o tema exportado.

---

### 4. Trocar tema em runtime

Carregue o tema via `<link>` no `index.html` e troque via JavaScript:

```html
<!-- index.html -->
<link id="kendo-theme" rel="stylesheet"
  href="https://kendo.cdn.telerik.com/themes/6.1.0/default/default-main.css">
```

```typescript
// app.component.ts
export class AppComponent {
  setTheme(swatch: 'default-main' | 'default-dark' | 'default-ocean-blue') {
    const link = document.getElementById('kendo-theme') as HTMLLinkElement;
    link.href = `https://kendo.cdn.telerik.com/themes/6.1.0/default/${swatch}.css`;
  }
}
```

```html
<!-- app.component.html -->
<button (click)="setTheme('default-dark')">Tema Escuro</button>
<button (click)="setTheme('default-main')">Tema Claro</button>
```

---

## Componentes — Instalação e Uso

---

### Charts (Gráficos)

> ✅ **Já instalado no projeto**

```bash
npm install @progress/kendo-angular-charts
```

```typescript
import { ChartsModule } from '@progress/kendo-angular-charts';

@Component({ imports: [ChartsModule] })
```

**Gráfico de Área + Linha (como no projeto):**
```html
<kendo-chart>
  <kendo-chart-series>
    <kendo-chart-series-item
      type="area"
      [data]="[100, 200, 150, 300]"
      color="#7C6FFF"
      [opacity]="0.2">
    </kendo-chart-series-item>
    <kendo-chart-series-item
      type="line"
      [data]="[120, 180, 160, 280]"
      color="#FFA94D"
      dashType="dash">
    </kendo-chart-series-item>
  </kendo-chart-series>
  <kendo-chart-category-axis>
    <kendo-chart-category-axis-item
      [categories]="['Jan','Fev','Mar','Abr']">
    </kendo-chart-category-axis-item>
  </kendo-chart-category-axis>
</kendo-chart>
```

**Gráfico Donut:**
```html
<kendo-chart>
  <kendo-chart-series>
    <kendo-chart-series-item
      type="donut"
      [data]="categorias"
      field="value"
      categoryField="label"
      [holeSize]="60">
    </kendo-chart-series-item>
  </kendo-chart-series>
</kendo-chart>
```

**Gráfico de Barras (Column):**
```html
<kendo-chart>
  <kendo-chart-series>
    <kendo-chart-series-item
      type="column"
      [data]="[42, 85, 67, 110]"
      color="#00C6A2"
      [gap]="0.4">
    </kendo-chart-series-item>
  </kendo-chart-series>
</kendo-chart>
```

---

### Grid (Tabela de Dados)

> ✅ **Já instalado no projeto**

```bash
npm install @progress/kendo-angular-grid
```

```typescript
import { GridModule } from '@progress/kendo-angular-grid';

@Component({ imports: [GridModule] })
```

**Grid básico com template de célula:**
```html
<kendo-grid [data]="itens" [height]="400">

  <kendo-grid-column field="nome" title="Nome" [width]="200">
  </kendo-grid-column>

  <kendo-grid-column field="valor" title="Valor" [width]="120">
    <ng-template kendoGridCellTemplate let-dataItem>
      <strong>{{ dataItem.valor | currency:'BRL' }}</strong>
    </ng-template>
  </kendo-grid-column>

  <kendo-grid-column field="status" title="Status" [width]="100">
    <ng-template kendoGridCellTemplate let-dataItem>
      <span [style.color]="dataItem.ativo ? '#00C6A2' : '#FF6B6B'">
        {{ dataItem.ativo ? 'Ativo' : 'Inativo' }}
      </span>
    </ng-template>
  </kendo-grid-column>

</kendo-grid>
```

**Grid com paginação e ordenação:**
```html
<kendo-grid
  [data]="gridData"
  [pageSize]="10"
  [skip]="skip"
  [pageable]="true"
  [sortable]="true"
  (pageChange)="onPageChange($event)">
  <!-- colunas aqui -->
</kendo-grid>
```

```typescript
skip = 0;

onPageChange(event: PageChangeEvent) {
  this.skip = event.skip;
}
```

---

### Buttons (Botões)

> ✅ **Já instalado no projeto**

```bash
npm install @progress/kendo-angular-buttons
```

```typescript
import { ButtonsModule } from '@progress/kendo-angular-buttons';

@Component({ imports: [ButtonsModule] })
```

**Botão simples:**
```html
<button kendoButton themeColor="primary">Salvar</button>
<button kendoButton themeColor="error">Excluir</button>
<button kendoButton fillMode="outline">Cancelar</button>
<button kendoButton fillMode="flat">Neutro</button>
```

**Botão toggle (como no seletor de período):**
```html
<button
  kendoButton
  [toggleable]="true"
  [selected]="periodo === 'mensal'"
  (click)="periodo = 'mensal'"
  fillMode="flat">
  Mensal
</button>
```

**ButtonGroup:**
```html
<kendo-buttongroup>
  <button kendoButton [toggleable]="true">Semana</button>
  <button kendoButton [toggleable]="true" [selected]="true">Mês</button>
  <button kendoButton [toggleable]="true">Ano</button>
</kendo-buttongroup>
```

---

### Indicators (Badge, Loader)

> ✅ **Já instalado no projeto**

```bash
npm install @progress/kendo-angular-indicators
```

```typescript
import { IndicatorsModule } from '@progress/kendo-angular-indicators';

@Component({ imports: [IndicatorsModule] })
```

**Badge em botão/ícone:**
```html
<span kendoBadgeContainer>
  <button kendoButton>Notificações</button>
  <kendo-badge
    themeColor="error"
    shape="dot"
    position="inside">
    5
  </kendo-badge>
</span>
```

**Loader de carregamento:**
```html
<kendo-loader
  *ngIf="carregando"
  type="converging-spinner"
  themeColor="primary"
  size="medium">
</kendo-loader>
```

---

### Date Inputs (DatePicker, TimePicker)

```bash
npm install @progress/kendo-angular-dateinputs
```

```typescript
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

@Component({ imports: [DateInputsModule] })
```

**DatePicker simples:**
```html
<kendo-datepicker
  [(value)]="dataSelecionada"
  [format]="'dd/MM/yyyy'"
  placeholder="Selecione uma data">
</kendo-datepicker>
```

**DateRangePicker (intervalo de datas):**
```html
<kendo-daterange>
  <kendo-dateinput kendoDateRangeStartInput [(value)]="inicio"></kendo-dateinput>
  <kendo-dateinput kendoDateRangeEndInput   [(value)]="fim"></kendo-dateinput>
</kendo-daterange>
```

```typescript
inicio: Date = new Date();
fim: Date = new Date();
```

---

### DropDowns (DropDownList, ComboBox)

```bash
npm install @progress/kendo-angular-dropdowns
```

```typescript
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

@Component({ imports: [DropDownsModule] })
```

**DropDownList (lista fechada):**
```html
<kendo-dropdownlist
  [data]="regioes"
  [(value)]="regiaoSelecionada"
  [defaultItem]="'Todas as regiões'">
</kendo-dropdownlist>
```

**ComboBox (lista + digitação livre):**
```html
<kendo-combobox
  [data]="vendedores"
  [filterable]="true"
  (filterChange)="filtrarVendedores($event)"
  [(value)]="vendedorSelecionado"
  placeholder="Buscar vendedor...">
</kendo-combobox>
```

```typescript
regioes = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Curitiba'];
regiaoSelecionada = '';

filtrarVendedores(termo: string) {
  this.vendedores = this.todosVendedores
    .filter(v => v.toLowerCase().includes(termo.toLowerCase()));
}
```

---

### Inputs (TextBox, NumericTextBox)

```bash
npm install @progress/kendo-angular-inputs
```

```typescript
import { InputsModule } from '@progress/kendo-angular-inputs';

@Component({ imports: [InputsModule] })
```

**TextBox com label flutuante:**
```html
<kendo-floatinglabel text="Nome do Vendedor">
  <input kendoTextBox [(ngModel)]="nome" />
</kendo-floatinglabel>
```

**NumericTextBox (valores monetários):**
```html
<kendo-numerictextbox
  [(value)]="meta"
  [format]="'R# #.##0,00'"
  [min]="0"
  [max]="1000000"
  [step]="1000"
  placeholder="Meta de receita">
</kendo-numerictextbox>
```

---

### Dialogs (Modal, Window)

```bash
npm install @progress/kendo-angular-dialogs
```

```typescript
import { DialogsModule } from '@progress/kendo-angular-dialogs';

@Component({ imports: [DialogsModule] })
```

**Dialog de confirmação:**
```html
<kendo-dialog
  *ngIf="mostrarDialog"
  title="Confirmar exclusão"
  (close)="mostrarDialog = false">

  <p>Deseja realmente excluir este vendedor?</p>

  <kendo-dialog-actions>
    <button kendoButton (click)="mostrarDialog = false">Cancelar</button>
    <button kendoButton themeColor="error" (click)="confirmarExclusao()">
      Excluir
    </button>
  </kendo-dialog-actions>

</kendo-dialog>

<button kendoButton (click)="mostrarDialog = true">Abrir Dialog</button>
```

```typescript
mostrarDialog = false;

confirmarExclusao() {
  // lógica de exclusão
  this.mostrarDialog = false;
}
```

---

### Notification (Toast)

```bash
npm install @progress/kendo-angular-notification
```

```typescript
import { NotificationModule, NotificationService } from '@progress/kendo-angular-notification';

@Component({ imports: [NotificationModule] })
export class AppComponent {
  constructor(private notifService: NotificationService) {}

  notificar() {
    this.notifService.show({
      content: 'Meta atingida com sucesso! 🎉',
      type: { style: 'success', icon: true },
      position: { horizontal: 'right', vertical: 'top' },
      animation: { type: 'fade', duration: 300 },
      hideAfter: 3000
    });
  }
}
```

```html
<!-- Obrigatório: container no template -->
<kendo-notification-container></kendo-notification-container>

<button kendoButton (click)="notificar()">Testar Notificação</button>
```

**Tipos de notificação disponíveis:**
| `style` | Uso |
|---|---|
| `success` | Operação concluída |
| `error` | Erro ou falha |
| `warning` | Alerta |
| `info` | Informação neutra |

---

### ProgressBar

```bash
npm install @progress/kendo-angular-progressbar
```

```typescript
import { ProgressBarModule } from '@progress/kendo-angular-progressbar';

@Component({ imports: [ProgressBarModule] })
```

**ProgressBar simples:**
```html
<kendo-progressbar
  [value]="metaAtingida"
  [max]="100"
  [label]="{ visible: true, format: 'percent' }">
</kendo-progressbar>
```

**ChunkProgressBar (blocos visuais):**
```html
<kendo-chunkprogressbar
  [value]="metaAtingida"
  [max]="100"
  [chunkCount]="5"
  [successRatio]="80">
</kendo-chunkprogressbar>
```

```typescript
metaAtingida = 76; // valor de 0 a 100
```

> **Dica para o dashboard:** substitua a barra de meta manual do Grid por `<kendo-progressbar>` para ganhar animações e acessibilidade.

---

### Tooltip

```bash
npm install @progress/kendo-angular-tooltip
```

```typescript
import { TooltipModule } from '@progress/kendo-angular-tooltip';

@Component({ imports: [TooltipModule] })
```

**Tooltip em qualquer elemento:**
```html
<!-- Adicione kendoTooltip no container pai -->
<div kendoTooltip>
  <span title="Receita acumulada no mês corrente">
    💰 R$ 847.320
  </span>

  <button title="Exportar dados para CSV">
    Exportar
  </button>
</div>
```

**Tooltip com template customizado:**
```html
<div [kendoTooltip]="meuTooltip" [tooltipShowOn]="'click'">
  <span>Hover aqui</span>
</div>

<ng-template #meuTooltip>
  <div style="padding: 8px">
    <strong>Detalhes da Métrica</strong>
    <p>Comparado ao mês anterior: +12,4%</p>
  </div>
</ng-template>
```

---

### Layout (Splitter, StackLayout)

> ✅ **LayoutModule já instalado no projeto**

```bash
npm install @progress/kendo-angular-layout
```

```typescript
import { LayoutModule } from '@progress/kendo-angular-layout';

@Component({ imports: [LayoutModule] })
```

**Splitter (painéis redimensionáveis):**
```html
<kendo-splitter style="height: 500px">
  <kendo-splitter-pane [collapsible]="true" size="280px">
    <!-- Sidebar / filtros -->
    <p>Filtros</p>
  </kendo-splitter-pane>
  <kendo-splitter-pane>
    <!-- Conteúdo principal -->
    <p>Gráfico principal</p>
  </kendo-splitter-pane>
</kendo-splitter>
```

**StackLayout (empilhamento com gap):**
```html
<kendo-stacklayout [gap]="16" orientation="horizontal">
  <kendo-card *ngFor="let kpi of kpis">
    <kendo-card-body>
      <p class="k-card-title">{{ kpi.title }}</p>
      <p>{{ kpi.value }}</p>
    </kendo-card-body>
  </kendo-card>
</kendo-stacklayout>
```

---

## 🔗 Links Úteis

| Recurso | Link |
|---|---|
| Documentação oficial | https://www.telerik.com/kendo-angular-ui/components |
| ThemeBuilder (customização visual) | https://themebuilder.telerik.com |
| Lista de variáveis SCSS do Default theme | https://www.telerik.com/kendo-angular-ui/components/styling/theme-default/customization |
| Demos interativos | https://www.telerik.com/kendo-angular-ui/components/charts |
| Todos os pacotes disponíveis | https://www.npmjs.com/search?q=%40progress%2Fkendo-angular |