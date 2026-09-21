## 16. 证明以有理点为圆心、有理数为半径的圆的全体是可数集

设 $A$ 为平面上所有以有理点为圆心、以正有理数为半径的圆所组成的集合。证明 $A$ 是可数集。

任意 $C\in A$ 都可以由其圆心与半径唯一确定。设圆心为 $(a,b)$，半径为 $r$，则

$$
a,b\in\mathbb{Q},
\qquad
r\in\mathbb{Q}_{>0},
$$

其中

$$
\mathbb{Q}_{>0}
=
\{q\in\mathbb{Q}:q>0\}.
$$

因此，每个圆都可以唯一表示为

$$
C(a,b,r)
=
\left\{
(x,y)\in\mathbb{R}^2:
(x-a)^2+(y-b)^2=r^2
\right\}.
$$

定义映射

$$
\Phi:
\mathbb{Q}^2\times\mathbb{Q}_{>0}
\longrightarrow A,
$$

$$
\Phi(a,b,r)=C(a,b,r).
$$

由于每个圆都有唯一的圆心和正半径，所以 $\Phi$ 是双射。因此，

$$
A\sim\mathbb{Q}^2\times\mathbb{Q}_{>0}.
$$

又因为 $\mathbb{Q}$ 是可数集，$\mathbb{Q}_{>0}\subseteq\mathbb{Q}$ 也是可数集，而有限个可数集的笛卡尔积仍是可数集，所以

$$
\mathbb{Q}^2\times\mathbb{Q}_{>0}
=
\mathbb{Q}\times\mathbb{Q}\times\mathbb{Q}_{>0}
$$

是可数集。

故

$$
\boxed{A\text{ 是可数集。}}
$$

---

## 17. 证明单调函数的不连续点至多只有可数多个

设 $f$ 是定义在区间 $I$ 上的单调函数。不妨设 $f$ 单调递增。

对于任意内点 $x\in I$，由于 $f$ 单调递增，左右极限都存在，并且

$$
f(x-)
=
\lim_{t\to x^-}f(t),
\qquad
f(x+)
=
\lim_{t\to x^+}f(t).
$$

同时有

$$
f(x-)\leq f(x)\leq f(x+).
$$

函数 $f$ 在点 $x$ 连续，当且仅当

$$
f(x-)=f(x)=f(x+).
$$

因此，如果 $x$ 是 $f$ 的不连续点，则必有

$$
f(x-)<f(x+).
$$

对于每一个不连续点 $x$，考虑非空开区间

$$
J_x
=
\bigl(f(x-),f(x+)\bigr).
$$

由于有理数集 $\mathbb{Q}$ 在实数集 $\mathbb{R}$ 中稠密，所以在每个区间 $J_x$ 中都可以选取一个有理数 $q_x$，使得

$$
f(x-)<q_x<f(x+).
$$

下面证明不同不连续点所对应的区间互不相交。

任取两个不连续点 $x<y$。由 $f$ 单调递增可知

$$
f(x+)\leq f(y-).
$$

因此，

$$
J_x
=
\bigl(f(x-),f(x+)\bigr)
$$

位于 $f(x+)$ 的左侧，而

$$
J_y
=
\bigl(f(y-),f(y+)\bigr)
$$

位于 $f(y-)$ 的右侧，从而

$$
J_x\cap J_y=\varnothing.
$$

因此，不同的不连续点所选取的有理数也不同，即

$$
x\neq y
\implies
q_x\neq q_y.
$$

于是，映射

$$
x\longmapsto q_x
$$

是从 $f$ 的不连续点集 $D$ 到有理数集 $\mathbb{Q}$ 的单射：

$$
D\hookrightarrow\mathbb{Q}.
$$

由于 $\mathbb{Q}$ 是可数集，故 $D$ 至多是可数集。

因此，单调递增函数的不连续点至多只有可数多个。对于单调递减函数，证明完全类似。

$$
\boxed{\text{单调函数的不连续点至多只有可数多个}}
$$