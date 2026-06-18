# 📱 Catálogo de Brinquedos Infláveis - Guia de Uso

## Visão Geral

O projeto UpBrinquedos agora possui um **catálogo completo de brinquedos infláveis** para aluguel com seleção de datas integrada.

## Estrutura Implementada

### 1. **Dados dos Brinquedos** (`assets/toys.ts`)

- Interface `Toy` com propriedades de cada brinquedo
- 8 brinquedos de exemplo no catálogo:
  - Castelo Inflável Grande
  - Piscina Inflável Premium
  - Escorregador Inflável
  - Piscina de Bolinhas
  - Trampolim Inflável
  - Casa do Pinguim
  - Combo Jogo de Tiro
  - Escada Inflável

### 2. **Página de Catálogo** (`components/pages/Home.tsx`)

Funcionalidades completas:

#### 🔍 **Busca e Filtro**

- Campo de busca por nome do brinquedo
- Filtro por categoria (Castelo, Piscina, Escorregador, etc.)
- Busca em tempo real

#### 🎯 **Grid de Produtos**

- Cards com imagem, nome, descrição
- Preço por dia
- Capacidade máxima de pessoas
- Botão "Adicionar ao Carrinho"

#### 📅 **Seleção de Datas**

- Modal com calendário interativo
- Seleção de data de início
- Seleção de data de término
- Período mínimo: próximo dia
- Período máximo: 90 dias

#### 💰 **Cálculo Automático**

- Número de dias de aluguel
- Preço total (preço/dia × quantidade de dias)
- Exibição do resumo antes de adicionar ao carrinho

#### 🛒 **Integração com Carrinho**

- Items adicionados ao CartContext
- Cada item tem ID único com timestamp
- Informações de data e cálculo preservadas

## Fluxo de Uso

### Para o Cliente:

1. **Abre o App** → Vê o formulário de endereço/datas gerais
2. **Completa Formulário** → Navega para o catálogo
3. **Navega para Home** → Vê o catálogo com brinquedos
4. **Busca/Filtra** → Encontra o brinquedo desejado
5. **Clica no Brinquedo** → Abre modal com detalhes
6. **Seleciona Datas** → Escolhe data de início e fim
7. **Vê Cálculo** → Total do aluguel aparece
8. **Adiciona ao Carrinho** → Item vai para o carrinho com datas
9. **Vai para Carrinho** → Revisa todos os itens
10. **Finaliza Aluguel** → (próxima implementação)

## Dados de Entrada/Saída

### 📤 Item Adicionado ao Carrinho

```typescript
{
  id: "1-1234567890",
  name: "Castelo Inflável Grande",
  price: 450,  // pricePerDay × dias
  pricePerDay: "150",
  startDate: "2024-06-20",
  endDate: "2024-06-23",
  days: 3,
  image: require("./icon.png")
}
```

## Próximos Passos Sugeridos

1. **Adicionar Imagens Reais**
   - Substituir `require("./icon.png")` por imagens reais dos brinquedos
   - Usar uma pasta `assets/toys/` com imagens PNG/JPG

2. **Integrar Backend**
   - Buscar lista de brinquedos de uma API
   - Salvar dados de aluguel no servidor
   - Implementar disponibilidade por período

3. **Funcionalidades Adicionais**
   - Avaliações/comentários de clientes
   - Promoções e descontos
   - Acessórios adicionais para aluguel
   - Histórico de aluguéis do cliente

4. **Melhorias UI/UX**
   - Animações ao abrir modal
   - Compartilhar lista de brinquedos
   - Wishlist/favoritos
   - Notificações de promoções

## Customização

### Adicionar Novo Brinquedo

Edite `assets/toys.ts` e adicione um novo objeto:

```typescript
{
  id: "9",
  name: "Novo Brinquedo",
  description: "Descrição do novo brinquedo",
  pricePerDay: 100,
  category: "Categoria",
  maxPeople: 5,
  dimensions: "3m x 2m x 2m",
  color: "Cor do brinquedo",
  image: require("./icon.png"),
}
```

### Modificar Preços

Edite o campo `pricePerDay` em qualquer brinquedo

### Modificar Categorias

Atualize o array `categories` em `Home.tsx` para adicionar/remover categorias

## Dependências Utilizadas

- ✅ `react-native-calendars` - Para seleção de datas
- ✅ `@expo/vector-icons` - Para ícones
- ✅ `@react-navigation` - Para navegação
- ✅ React Hooks (useState) - Para estado local

## Notas Técnicas

- **CartContext**: Gerencia todos os itens de aluguel globalmente
- **State Local**: Home mantém estado de busca, filtro e modal
- **TypeScript**: Totalmente tipado para melhor segurança
- **StyleSheet**: Styles otimizados para React Native
- **Responsividade**: Grid automático baseado em porcentagem de largura

---

**Pronto para usar! 🚀**
