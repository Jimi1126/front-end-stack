# 前言

CSS 是如何决定页面上元素的样式？CSS 规则如何相互影响？

下面我们来说说 CSS 的一些最基本的概念——层叠、优先级和继承——这些概念决定着如何将 CSS 应用到 HTML 中，以及如何解决冲突。

## 冲突规则

CSS 代表层叠样式表（Cascading Style Sheets），理解第一个词层叠（cascade）很重要——层叠的表现方式是理解 CSS 的关键。

在某些时候，在做一个项目过程中你会发现一些应该产生效果的样式没有生效。通常的原因是你创建了两个应用于同一个元素的规则。与层叠密切相关的概念是优先级（specificity），决定在发生冲突的时候应该使用哪条规则。设计元素样式的规则可能不是期望的规则，因此需要了解这些机制是如何工作的。

这里也有继承的概念，也就是在默认情况下，一些 css 属性继承当前元素的父元素上设置的值，有些则不继承。这也可能导致一些和期望不同的结果。

我们来快速地看下正在处理的关键问题，然后依次了解它们是如何相互影响的，以及如何和 CSS 交互的。虽然这些概念难以理解，但是随着不断的练习，你会慢慢熟悉它的工作原理。

### 层叠

样式表层叠——简单的说，就是 CSS 规则的顺序很重要；当应用两条同级别的规则到一个元素的时候，写在后面的就是实际使用的规则。

```html
<h1>This is my heading</h1>
<style>
  h1 {
    color: red;
  }
  h1 {
    color: blue;
  }
</style>
```

上面的示例中，我们有两个关于 `<h1>` 的规则。`<h1>` 最后显示蓝色。两个规则来自同一个源，且具有相同的元素选择器，有相同的优先级，所以顺序在最后的生效。

### 优先级

浏览器是根据优先级来决定当多个规则有不同选择器对应相同的元素的时候需要使用哪个规则。它基本上是一个衡量选择器具体选择哪些区域的尺度：

- 一个元素选择器不是很具体，则会选择页面上该类型的所有元素，所以它的优先级就会低一些。
- 一个类选择器稍微具体点，则会选择该页面中有特定 class 属性值的元素，所以它的优先级就要高一点。

```html
<h1 class="main-heading">This is my heading</h1>
<style>
  .main-heading {
    color: red;
  }

  h1 {
    color: blue;
  }
</style>
```

我们再来介绍两个适用于 `<h1>` 的规则。`<h1>` 最后会显示红色——类选择器 main-heading 有更高的优先级，因此就会被应用——即使元素选择器顺序在它后面。

### 继承

继承也需要在上下文中去理解——一些设置在父元素上的 CSS 属性是可以被子元素继承的，有些则不能。

举一个例子，如果你设置一个元素的 color 和 font-family，每个在里面的元素也都会有相同的属性，除非你直接在元素上设置属性。

一些属性是不能继承的——举个例子如果你在一个元素上设置 width 为 50% ，所有的后代不会是父元素的宽度的 50% 。如果这个也可以继承的话，CSS 就会很难使用了！

## 理解继承

继承是 CSS 中一个非常有用的特性，它允许我们设置一些属性在父元素上，然后由子元素自动继承下来。

举个例子，如果我们在 body 元素上设置了 font-family ，那么页面上的所有元素都会使用这个字体。

```html
<h1>This is my heading</h1>
<p>This is a paragraph.</p>
<style>
  body {
    font-family: Arial, sans-serif;
  }
</style>
```

在这个例子中，`<h1>` 和 `<p>` 都继承了 body 的 font-family 属性值。

### 控制继承

CSS 为控制继承提供了五个特殊的通用属性值。每个 CSS 属性都接收这些值。

**inherit：**
设置该属性会使子元素属性和父元素相同。实际上，就是“开启继承”。

**initial：**
将应用于选定元素的属性值设置为该属性的初始值。

**revert：**
将应用于选定元素的属性值重置为浏览器的默认样式，而不是应用于该属性的默认值。在许多情况下，此值的作用类似于 unset。

**revert-layer：**
将应用于选定元素的属性值重置为在上一个层叠层中建立的值。

**unset：**
将属性重置为自然值，也就是如果属性是自然继承那么就是 inherit，否则和 initial 一样。

### 重设所有属性值

CSS 的简写属性 all 可以用于同时将这些继承值中的一个应用于（几乎）所有属性。它的值可以是其中任意一个（inherit、initial、unset 或 revert）。这是一种撤销对样式所做更改的简便方法，以便回到之前已知的起点。

```html
<style>
  blockquote {
    background-color: orange;
    border: 2px solid blue;
  }

  .fix-this {
    all: unset;
  }
</style>
<blockquote>
  <p>This blockquote is styled</p>
</blockquote>

<blockquote class="fix-this">
  <p>This blockquote is not styled</p>
</blockquote>
```

在上面的示例中，我们为第一个 `<blockquote>` 设置了样式。第二个 `<blockquote>` 的类是 fix-this ，它使用 all: unset 重置了所有属性值。

## 理解层叠

层叠是 CSS 的一个基本特征，它是一个定义了如何合并来自多个源的属性值的算法。它在 CSS 处于核心地位，CSS 的全称层叠样式表正是强调了这一点。现在，我们将要了解层叠如何定义在不止一个规则的时候怎么应用 CSS 规则。

### 1. 资源顺序

我们已经看到了顺序对于层叠的重要性。如果你有超过一条规则，而且都是相同的权重，那么最后面的规则会应用。可以理解为后面的规则覆盖前面的规则，直到最后一个开始设置样式。

资源顺序仅在规则的优先级相同时才体现出来，如果规则的优先级不同，那么资源顺序就不重要了。

### 2. 优先级

我们发现在一些情况下，有些规则在最后出现，但是却应用了前面的具有冲突的规则。这是因为前面的有更高的优先级——它范围更小，因此浏览器就把它选择为元素的样式。其中决定优先级的因素被称为权重，权重是 CSS 中用来确定哪个规则比另一个规则更具体的机制。

优先级就是分配给指定的 CSS 声明的一个权重，它由规则定义中每一种选择器类型的 **数值** 决定。

而当优先级与多个 CSS 声明中任意一个声明的优先级相等的时候，CSS 中最后的那个声明将会被应用到元素上。

当同一个元素有多个声明的时候，优先级才会有意义。因为每一个直接作用于元素的 CSS 规则总是会接管/覆盖（take over）该元素从祖先元素继承而来的规则。

一个选择器的优先级可以说是由三个不同的值（或分量）相加，可以认为是百（ID）十（类）个（元素）——三位数的三个位数：

- **ID**：选择器中包含 ID 选择器则百位得一分。
- **类**：选择器中包含类、伪类选择器、属性选择器则十位得一分。
- **元素**：选择器中包含元素、伪元素选择器则个位得一分。

**通配选择器**（universal selector）（\*）关系选择器（combinator）（+、>、~、" "、||）和 否定伪类（negation pseudo-class）（:not()）对优先级没有影响。（但是，在 :not() 内部声明的选择器会影响优先级）。

如下是优先级的计算规则示例：

|                 选择器                  | ID  | 类  | 元素 | 优先级 |
| :-------------------------------------: | :-: | :-: | :--: | :----: |
|                   #id                   |  1  |  0  |  0   | 1-0-0  |
|                 .class                  |  0  |  1  |  0   | 0-1-0  |
|                 element                 |  0  |  0  |  1   | 0-0-1  |
|          h1 + p::first-letter           |  0  |  0  |  3   | 0-0-3  |
| li > a[href*="en-US"] > .inline-warning |  0  |  2  |  2   | 0-2-2  |
|       button:not(#mainBtn, .cta)        |  1  |  0  |  1   | 1-0-1  |

> 评估优先级的最佳方法是对不同的优先级等级单独进行评分，并从最高的等级开始，必要时再计算低优先级等级的权重。即，仅当某一列的优先级权重相同时，你才需要评估下一列；否则，你可以直接忽略低等级的选择器，因为它们无法覆盖高优先级等级的选择器。

### 3. 重要程度

除了优先级之外，CSS 还提供了另外的机制来决定哪个规则会应用。

**内联样式**

内联样式，即 style 属性内的样式声明，优先于所有普通的选择器，无论其优先级如何。这样的声明没有选择器，但它们的优先级可以理解为 1-0-0-0；即无论选择器中有多少个 ID，它总是比其他任何优先级的权重都要高。

**!important**

有一个特殊的 CSS 可以用来覆盖所有上面所有优先级计算，不过需要很小心的使用——!important。用于修改特定属性的值，能够覆盖普通规则的层叠。

> 覆盖 !important 唯一的办法就是另一个 !important 具有相同优先级而且顺序靠后，或者更高优先级。

## CSS 声明位置的影响

CSS 层叠算法期望通过挑选 CSS 声明来给 CSS 属性设置正确的值。CSS 声明的来源也对 CSS 规则的优先级有决定性作用，CSS 声明可以有不同的来源：

- 浏览器会有一个基本的样式表来给任何网页设置默认样式。这些样式统称**用户代理样式**。一些浏览器通过使用真正的样式表，而其他则通过代码模拟，但无论是哪种情形都应是不可被检测的。而且部分浏览器允许用户修改用户代理样式。尽管 HTML 标准对用户代理样式做了诸多限制，浏览器仍大有可为，具体表现在不同浏览器间会存在重大的差异。为了减轻开发成本以及降低样式表运行所需的基本环境，网页开发者通常会使用一个 CSS reset 样式表，强制将常见的属性值转为确定状态。
- 网页的作者可以定义文档的样式，这是最常见的样式表。大多数情况下此类型样式表会定义多个，可以声明在不同的位置：
  - **内联样式（inline style）**：写在 HTML 元素中的样式声明。
  - **内部样式表（internal style sheet）**：写在 `<style>` 标签中的 CSS 代码。
  - **外部样式表（external stylesheet）**：通过 `<link>` 标签链接到 CSS 文件。
- 读者，作为浏览器的用户，可以使用自定义样式表定制使用体验。例如，用户可以设置浏览器字体大小、颜色和背景色。

尽管 CSS 样式会来自这些不同的源，但它们的作用范围是重叠的，而层叠算法则定义了它们如何相互作用。

**层叠顺序**

层叠算法决定如何找出要应用到每个文档元素的每个属性上的值。

1. 它首先过滤来自不同源的全部规则，并保留要应用到指定元素上的那些规则。这意味着这些规则的选择器匹配指定元素，同时也是一个合适的 @规则（at-rule）的一部分。
2. 其次，它依据重要性对这些规则进行排序。即是指，规则后面是否跟随者 !important 以及规则的来源。层叠是按升序排列的，这意味着来着用户自定义样式表的 !important 值比用户代理样式表的普通值优先级高。相互冲突的声明将按以下顺序应用，后一种声明将覆盖前一种声明：
   1. 用户代理样式表中的声明（例如，浏览器的默认样式，在没有设置其他样式时使用）。
   2. 用户样式表中的常规声明（由用户设置的自定义样式）。
   3. 作者样式表中的常规声明（这些是我们 web 开发人员设置的样式）。
   4. CSS 动画样式表中的常规声明（由 CSS 动画创建的样式）。
   5. 作者样式表中的 !important 声明
   6. 用户样式表中的 !important 声明
   7. 用户代理样式表中的 !important 声明
   8. CSS 过渡样式表中的常规声明（由 CSS 过渡创建的样式）。
3. 假如层叠顺序相等，则使用哪个值取决于优先级。

来源优先权总是胜过选择器优先级。如果一个元素属性被多个来源中的普通样式声明所设置，那么作者样式表将总是覆盖用户或用户代理样式表中声明的冗余普通属性。如果样式是重要的，那么用户代理样式表将总是胜过作者和用户样式。层叠来源优先权确保了不同来源之间的优先级冲突永远不会发生。

## 级联层（层叠层）

级联层是另一个可以影响 CSS 优先级的机制。CSS `@规则` 中的 `@layer` 声明了一个 级联层，同一层内的规则将级联在一起，这给予了开发者对层叠机制的更多控制。

```css
@layer utilities {
  /* 创建一个名为 utilities 的级联层 */
  .padding-sm {
    padding: 0.5rem;
  }

  .padding-lg {
    padding: 0.8rem;
  }
}
```

@layer @规则可以通过三种方式其一来创建级联层。第一种方法如上方代码所示，它创建了一个块级的 @规则，其中包含作用于该层内部的 CSS 规则。

第二种是通过 @import 来创建，规则存在于被引入的样式表内：

```css
@import (utilities.css) layer(utilities);
```

第三种方法是在 @layer 关键字后面直接指定一个层名，但不指定任何样式。后面通过 @layer 关键字后面指定该层名来定义规则。

```css
@layer utilities;

@layer utilities {
  .padding-sm {
    padding: 0.5rem;
  }
}

@layer utilities {
  .padding-lg {
    padding: 0.8rem;
  }
}
```

或者，多个命名层也可以被同时定义，在 @layer 关键字后面指定一个逗号分隔的层名列表。例如：

```css
@layer theme, layout, utilities;
```

这一做法很有用，因为层最初被指定的顺序决定了它是否有优先级。对于声明而言，如果同一声明在多个级联层中被指定，最后一层中的将优先于其他层。因此，在上面的例子中，如果 theme 层和 utilities 层中存在冲突的规则，那么 utilities 层中的将优先被应用。

即使 utilities 层中规则的 优先级低于 theme 层中的，该规则仍会被应用。一旦级联层顺序建立之后，优先级和出现顺序都会被忽略。这将使创建 CSS 选择器变得更加简单，因为你不需要确保每一个选择器都有足够高的优先级来覆盖其他冲突的规则，你只需要确保它们出现在一个顺序更靠后的级联层中。

> 在已经声明级联层的名字后，它们的顺序随即被确立，你可以重复声明某级联层的名字来向其添加 CSS 规则。这些样式将被附加到该层的末尾，且级联层之间的顺序不会改变。

其他不属于任何一级联层的样式将被集中到同一匿名层，并置于所有层的后部，这意味着任何在层外声明的样式都会覆盖在层内声明的样式。

**嵌套层**

级联层也可以嵌套在另一个层中，这允许你创建更细粒度的层。例如：

```css
@layer framework {
  @layer layout {
  }
}
```

向 framework 层内部的 layout 层附加规则，只需用 . 连接这两层。

```css
@layer framework.layout {
  p {
    margin-block: 1rem;
  }
}
```

**匿名层**

如果创建了一个级联层但并未指定名字，例如：

```css
@layer {
  p {
    margin-block: 1rem;
  }
}
```

那么则称为创建了一个匿名层。除创建后无法向其添加规则外，该层和其他命名层功能一致。

**小结**

在级联层中声明的 CSS，优先级的顺序由声明层的顺序来决定。在任何层之外声明的 CSS 样式会被按声明的顺序组合在一起，形成一个未命名的层，它会被当作最后声明的层。对于存在冲突的常规（没有 !important 声明）样式，后面的层比先前定义的层的优先级高。但对于带有 !important 标记的样式，其顺序相反——先前的层中的 important 样式比后面的层以及为在层中声明的 important 样式优先级要高。但内联样式比所有作者定义的样式的优先级都要高，不受级联层规则的影响。

> 当你在不同的层中有多个规则，且其中提供了对于**某一元素的单一属性**的相互冲突的值时，声明该冲突样式的层的顺序将决定其优先级。而不是高优先级的层直接覆盖低优先级的层中的**所有样式**。需要注意的是单独的一个层中的样式的优先级仍旧会起作用。

## 总结

在本文中，我们介绍了 CSS 的优先级计算机制，以及如何通过层叠来决定哪个样式将应用于元素。我们还讨论了如何使用 !important 来覆盖所有其他优先级计算，但需要小心使用。最后，我们介绍了 CSS 中的级联层，它们允许你控制 CSS 规则的优先级和顺序，并创建更细粒度的层。

由此我们对浏览器是如何计算元素的属性值有了比较清晰的概念：

**（用户代理样式!important > 用户样式!important > 作者样式 !important） > 作者样式（内联样式 > 级联层（优先级） > 选择器（优先级）） > 继承 > 用户样式 > 用户代理样式**。

CSS 层叠是 CSS 中最重要的部分之一，它决定了哪些规则会应用到元素上。了解如何确定优先级和层叠顺序对于编写和维护 CSS 代码至关重要。

## 参考链接

> https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity https://developer.mozilla.org/zh-CN/docs/Web/CSS/Cascade
