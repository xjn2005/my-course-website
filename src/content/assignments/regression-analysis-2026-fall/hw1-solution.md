# 作业 1：参考答案

## 1. 变量间的统计关系和函数关系是什么？

### 函数关系

函数关系是一种确定性关系。给定自变量 $X$ 的取值后，因变量 $Y$ 的取值便被唯一确定：

$$
Y=f(X).
$$

例如，半径为 $r$ 的圆，其面积满足

$$
S=\pi r^2.
$$

只要 $r$ 确定，$S$ 就唯一确定。

### 统计关系

统计关系是一种非确定性关系。给定 $X$ 后，$Y$ 的取值仍然具有随机性，只能描述其条件分布或平均变化规律：

$$
Y=f(X)+\varepsilon,
$$

其中，$\varepsilon$ 表示其他因素和随机误差造成的扰动。

例如，收入与消费之间通常可以表示为

$$
Y=\beta_0+\beta_1X+\varepsilon.
$$

即使收入 $X$ 相同，不同个体的消费 $Y$ 也可能不同。

两者的主要区别如下：

| 关系 | 给定 $X$ 后的 $Y$ | 是否含有随机性 |
|---|---|---|
| 函数关系 | 唯一确定 | 否 |
| 统计关系 | 不能唯一确定 | 是 |

---

## 2. 回归分析与相关分析的区别与联系是什么？

### 联系

回归分析与相关分析都用于研究变量之间的统计关系，考察变量是否共同变化以及这种关系的方向和强弱。

在一元线性回归中，样本相关系数 $r$ 与回归斜率估计量 $\hat{\beta}_1$ 满足

$$
\hat{\beta}_1
=
r\frac{s_Y}{s_X},
$$

其中，$s_X$ 和 $s_Y$ 分别为 $X$ 与 $Y$ 的样本标准差。

因此，

$$
\operatorname{sgn}(\hat{\beta}_1)
=
\operatorname{sgn}(r).
$$

在含有截距项的一元线性回归中，决定系数还满足

$$
R^2=r^2.
$$

### 区别

| 比较内容 | 相关分析 | 回归分析 |
|---|---|---|
| 研究目的 | 衡量变量间线性关系的方向与强度 | 建立变量间的数量关系并进行解释或预测 |
| 变量地位 | 变量地位对称 | 区分解释变量与被解释变量 |
| 主要结果 | 相关系数 $r$ | 回归方程与参数估计 |
| 对称性 | $r_{XY}=r_{YX}$ | $Y$ 对 $X$ 的回归与 $X$ 对 $Y$ 的回归通常不同 |
| 量纲 | 相关系数没有量纲 | 回归系数通常具有量纲 |
| 取值范围 | $-1\leq r\leq 1$ | 回归系数没有固定的取值范围 |
| 主要用途 | 描述相关程度 | 解释、估计和预测 |

需要注意：

$$
\text{相关关系}
\not\Rightarrow
\text{因果关系}.
$$

回归分析本身同样不能自动证明因果关系。因果解释还需要合理的研究设计、理论依据与识别条件。

---

## 3. 最小二乘估计量 $\hat{\beta}_0$ 与 $\hat{\beta}_1$ 的推导

考虑一元线性回归模型

$$
Y_i=\beta_0+\beta_1X_i+\varepsilon_i,
\qquad i=1,2,\ldots,n.
$$

给定样本观测值 $(X_i,Y_i)$，第 $i$ 个观测值的残差为

$$
e_i
=
Y_i-\beta_0-\beta_1X_i.
$$

最小二乘法通过最小化残差平方和来估计参数：

$$
Q(\beta_0,\beta_1)
=
\sum_{i=1}^n
\left(
Y_i-\beta_0-\beta_1X_i
\right)^2.
$$

分别对 $\beta_0$ 和 $\beta_1$ 求偏导：

$$
\frac{\partial Q}{\partial\beta_0}
=
-2\sum_{i=1}^n
\left(
Y_i-\beta_0-\beta_1X_i
\right),
$$

$$
\frac{\partial Q}{\partial\beta_1}
=
-2\sum_{i=1}^n
X_i
\left(
Y_i-\beta_0-\beta_1X_i
\right).
$$

令两个偏导数均为零，得到正规方程：

$$
\sum_{i=1}^n
\left(
Y_i-\hat{\beta}_0-\hat{\beta}_1X_i
\right)
=
0,
$$

$$
\sum_{i=1}^n
X_i
\left(
Y_i-\hat{\beta}_0-\hat{\beta}_1X_i
\right)
=
0.
$$

由第一个正规方程可得

$$
\sum_{i=1}^nY_i
=
n\hat{\beta}_0
+
\hat{\beta}_1\sum_{i=1}^nX_i.
$$

两边同时除以 $n$，得到

$$
\bar{Y}
=
\hat{\beta}_0+\hat{\beta}_1\bar{X}.
$$

因此，

$$
\boxed{
\hat{\beta}_0
=
\bar{Y}-\hat{\beta}_1\bar{X}
}.
$$

将其代入第二个正规方程，得到

$$
\sum_{i=1}^n
(X_i-\bar{X})(Y_i-\bar{Y})
=
\hat{\beta}_1
\sum_{i=1}^n
(X_i-\bar{X})^2.
$$

记

$$
S_{xx}
=
\sum_{i=1}^n
(X_i-\bar{X})^2,
$$

$$
S_{xy}
=
\sum_{i=1}^n
(X_i-\bar{X})(Y_i-\bar{Y}),
$$

则斜率的最小二乘估计量为

$$
\boxed{
\hat{\beta}_1
=
\frac{S_{xy}}{S_{xx}}
=
\frac{
\sum_{i=1}^n
(X_i-\bar{X})(Y_i-\bar{Y})
}{
\sum_{i=1}^n
(X_i-\bar{X})^2
}
}.
$$

截距的最小二乘估计量为

$$
\boxed{
\hat{\beta}_0
=
\bar{Y}-\hat{\beta}_1\bar{X}
}.
$$

因此，样本回归方程为

$$
\boxed{
\hat{Y}_i
=
\hat{\beta}_0+\hat{\beta}_1X_i
}.
$$

---

## 4. $\hat{\beta}_0$ 的方差推导

假设经典线性回归模型满足

$$
\operatorname{E}(\varepsilon_i\mid X)=0,
$$

$$
\operatorname{Var}(\varepsilon_i\mid X)=\sigma^2,
$$

$$
\operatorname{Cov}(\varepsilon_i,\varepsilon_j\mid X)=0,
\qquad i\neq j.
$$

由模型

$$
Y_i=\beta_0+\beta_1X_i+\varepsilon_i
$$

可得

$$
\bar{Y}
=
\beta_0+\beta_1\bar{X}+\bar{\varepsilon},
$$

其中

$$
\bar{\varepsilon}
=
\frac{1}{n}
\sum_{i=1}^n\varepsilon_i.
$$

斜率估计量可以写为

$$
\hat{\beta}_1
=
\frac{
\sum_{i=1}^n
(X_i-\bar{X})Y_i
}{
S_{xx}
}.
$$

将

$$
Y_i=\beta_0+\beta_1X_i+\varepsilon_i
$$

代入上式，得到

$$
\begin{aligned}
\hat{\beta}_1
&=
\frac{
\sum_{i=1}^n
(X_i-\bar{X})
(\beta_0+\beta_1X_i+\varepsilon_i)
}{
S_{xx}
}\\
&=
\beta_1
+
\frac{
\sum_{i=1}^n
(X_i-\bar{X})\varepsilon_i
}{
S_{xx}
}.
\end{aligned}
$$

因此，

$$
\hat{\beta}_1-\beta_1
=
\frac{
\sum_{i=1}^n
(X_i-\bar{X})\varepsilon_i
}{
S_{xx}
}.
$$

又因为

$$
\hat{\beta}_0
=
\bar{Y}-\hat{\beta}_1\bar{X},
$$

所以

$$
\begin{aligned}
\hat{\beta}_0
&=
\beta_0+\beta_1\bar{X}+\bar{\varepsilon}
-\hat{\beta}_1\bar{X}
\\
&=
\beta_0+\bar{\varepsilon}
-\bar{X}(\hat{\beta}_1-\beta_1).
\end{aligned}
$$

于是

$$
\hat{\beta}_0-\beta_0
=
\bar{\varepsilon}
-
\bar{X}
\frac{
\sum_{i=1}^n
(X_i-\bar{X})\varepsilon_i
}{
S_{xx}
}.
$$

因此，

$$
\begin{aligned}
\operatorname{Var}(\hat{\beta}_0\mid X)
={}&
\operatorname{Var}
\left[
\bar{\varepsilon}
-
\bar{X}
\frac{
\sum_{i=1}^n
(X_i-\bar{X})\varepsilon_i
}{
S_{xx}
}
\middle|X
\right]
\\
={}&
\operatorname{Var}(\bar{\varepsilon}\mid X)
+
\bar{X}^2
\operatorname{Var}
\left[
\frac{
\sum_{i=1}^n
(X_i-\bar{X})\varepsilon_i
}{
S_{xx}
}
\middle|X
\right]
\\
&-
2\bar{X}
\operatorname{Cov}
\left[
\bar{\varepsilon},
\frac{
\sum_{i=1}^n
(X_i-\bar{X})\varepsilon_i
}{
S_{xx}
}
\middle|X
\right].
\end{aligned}
$$

首先，

$$
\begin{aligned}
\operatorname{Var}(\bar{\varepsilon}\mid X)
&=
\operatorname{Var}
\left(
\frac{1}{n}
\sum_{i=1}^n\varepsilon_i
\middle|X
\right)
\\
&=
\frac{1}{n^2}
\sum_{i=1}^n
\operatorname{Var}(\varepsilon_i\mid X)
\\
&=
\frac{\sigma^2}{n}.
\end{aligned}
$$

其次，

$$
\begin{aligned}
\operatorname{Var}
\left[
\frac{
\sum_{i=1}^n
(X_i-\bar{X})\varepsilon_i
}{
S_{xx}
}
\middle|X
\right]
&=
\frac{1}{S_{xx}^2}
\sum_{i=1}^n
(X_i-\bar{X})^2
\operatorname{Var}(\varepsilon_i\mid X)
\\
&=
\frac{
\sigma^2
\sum_{i=1}^n
(X_i-\bar{X})^2
}{
S_{xx}^2
}
\\
&=
\frac{\sigma^2}{S_{xx}}.
\end{aligned}
$$

最后，

$$
\begin{aligned}
\operatorname{Cov}
\left[
\bar{\varepsilon},
\frac{
\sum_{i=1}^n
(X_i-\bar{X})\varepsilon_i
}{
S_{xx}
}
\middle|X
\right]
&=
\frac{1}{nS_{xx}}
\sum_{i=1}^n
(X_i-\bar{X})
\operatorname{Var}(\varepsilon_i\mid X)
\\
&=
\frac{\sigma^2}{nS_{xx}}
\sum_{i=1}^n
(X_i-\bar{X})
\\
&=
0,
\end{aligned}
$$

因为

$$
\sum_{i=1}^n(X_i-\bar{X})=0.
$$

综上，

$$
\boxed{
\operatorname{Var}(\hat{\beta}_0\mid X)
=
\sigma^2
\left(
\frac{1}{n}
+
\frac{\bar{X}^2}{S_{xx}}
\right)
}.
$$

又因为

$$
S_{xx}
=
\sum_{i=1}^nX_i^2-n\bar{X}^2,
$$

所以

$$
S_{xx}+n\bar{X}^2
=
\sum_{i=1}^nX_i^2.
$$

于是也可以写成

$$
\boxed{
\operatorname{Var}(\hat{\beta}_0\mid X)
=
\sigma^2
\frac{
\sum_{i=1}^nX_i^2
}{
nS_{xx}
}
}.
$$

由于 $\sigma^2$ 通常未知，可以使用残差方差估计量

$$
\hat{\sigma}^2
=
\frac{
\sum_{i=1}^n
\left(
Y_i-\hat{\beta}_0-\hat{\beta}_1X_i
\right)^2
}{
n-2
}
$$

代替 $\sigma^2$，从而得到

$$
\boxed{
\widehat{\operatorname{Var}}(\hat{\beta}_0)
=
\hat{\sigma}^2
\left(
\frac{1}{n}
+
\frac{\bar{X}^2}{S_{xx}}
\right)
}.
$$

---

## 5. $\hat{\beta}_0$ 与 $\hat{\beta}_1$ 的协方差推导

由

$$
\hat{\beta}_0
=
\bar{Y}-\bar{X}\hat{\beta}_1
$$

可得

$$
\begin{aligned}
\operatorname{Cov}
(\hat{\beta}_0,\hat{\beta}_1\mid X)
&=
\operatorname{Cov}
(\bar{Y}-\bar{X}\hat{\beta}_1,\hat{\beta}_1\mid X)
\\
&=
\operatorname{Cov}
(\bar{Y},\hat{\beta}_1\mid X)
-
\bar{X}
\operatorname{Var}(\hat{\beta}_1\mid X).
\end{aligned}
$$

由于

$$
\bar{Y}
=
\beta_0+\beta_1\bar{X}+\bar{\varepsilon},
$$

因此

$$
\operatorname{Cov}
(\bar{Y},\hat{\beta}_1\mid X)
=
\operatorname{Cov}
(\bar{\varepsilon},\hat{\beta}_1\mid X).
$$

又因为

$$
\hat{\beta}_1-\beta_1
=
\frac{
\sum_{i=1}^n
(X_i-\bar{X})\varepsilon_i
}{
S_{xx}
},
$$

所以

$$
\begin{aligned}
\operatorname{Cov}
(\bar{\varepsilon},\hat{\beta}_1\mid X)
&=
\operatorname{Cov}
\left[
\frac{1}{n}\sum_{i=1}^n\varepsilon_i,
\frac{
\sum_{i=1}^n
(X_i-\bar{X})\varepsilon_i
}{
S_{xx}
}
\middle|X
\right]
\\
&=
\frac{1}{nS_{xx}}
\sum_{i=1}^n
(X_i-\bar{X})
\operatorname{Var}(\varepsilon_i\mid X)
\\
&=
\frac{\sigma^2}{nS_{xx}}
\sum_{i=1}^n
(X_i-\bar{X})
\\
&=
0.
\end{aligned}
$$

另一方面，

$$
\begin{aligned}
\operatorname{Var}(\hat{\beta}_1\mid X)
&=
\operatorname{Var}
\left[
\frac{
\sum_{i=1}^n
(X_i-\bar{X})\varepsilon_i
}{
S_{xx}
}
\middle|X
\right]
\\
&=
\frac{\sigma^2}{S_{xx}}.
\end{aligned}
$$

因此，

$$
\begin{aligned}
\operatorname{Cov}
(\hat{\beta}_0,\hat{\beta}_1\mid X)
&=
0-
\bar{X}\frac{\sigma^2}{S_{xx}}
\\
&=
-\frac{\bar{X}\sigma^2}{S_{xx}}.
\end{aligned}
$$

最终得到

$$
\boxed{
\operatorname{Cov}
(\hat{\beta}_0,\hat{\beta}_1\mid X)
=
-\frac{\bar{X}\sigma^2}{S_{xx}}
}.
$$

实际计算时，用 $\hat{\sigma}^2$ 代替 $\sigma^2$：

$$
\boxed{
\widehat{\operatorname{Cov}}
(\hat{\beta}_0,\hat{\beta}_1)
=
-\frac{\bar{X}\hat{\sigma}^2}{S_{xx}}
}.
$$

如果对解释变量进行中心化，令

$$
X_i^{*}=X_i-\bar{X},
$$

则

$$
\bar{X}^{*}=0.
$$

此时，相应的截距估计量与斜率估计量的协方差为

$$
\operatorname{Cov}
(\hat{\beta}_0^{*},\hat{\beta}_1\mid X)
=
0.
$$