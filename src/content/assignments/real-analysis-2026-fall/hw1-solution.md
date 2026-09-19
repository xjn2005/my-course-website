# 作业 1：参考答案

## 3. 构造互不相交的集合列

设 $\{A_n\}$ 是一列集合，并定义

$$
B_1=A_1,\qquad
B_n=A_n\setminus\bigcup_{i=1}^{n-1}A_i,
\quad n\ge 2.
$$

证明 $\{B_n\}$ 两两互不相交，并且

$$
\bigcup_{i=1}^n A_i=\bigcup_{i=1}^n B_i,
\quad n\ge 1.
$$

### 证明 $\{B_n\}$ 两两互不相交

任取 $m<n$。由 $B_m\subseteq A_m$，并且

$$
B_n
=
A_n\setminus\bigcup_{i=1}^{n-1}A_i,
$$

可知

$$
B_n\cap A_m=\varnothing,
$$

因为 $m\le n-1$，从而 $A_m\subseteq\displaystyle\bigcup_{i=1}^{n-1}A_i$。

又因为 $B_m\subseteq A_m$，所以

$$
B_m\cap B_n=\varnothing.
$$

因此，对于任意 $m\ne n$，都有

$$
B_m\cap B_n=\varnothing.
$$

故 $\{B_n\}$ 是一列两两互不相交的集合。

### 证明有限并集相等

下面证明

$$
\bigcup_{i=1}^n A_i=\bigcup_{i=1}^n B_i.
$$

首先，由 $B_i\subseteq A_i$，可得

$$
\bigcup_{i=1}^n B_i
\subseteq
\bigcup_{i=1}^n A_i.
$$

反过来，任取

$$
x\in\bigcup_{i=1}^n A_i.
$$

则集合

$$
I_x=\{i\in\{1,2,\ldots,n\}:x\in A_i\}
$$

非空。设

$$
k=\min I_x.
$$

于是 $x\in A_k$，并且对所有 $i<k$，都有 $x\notin A_i$。因此

$$
x\in A_k\setminus\bigcup_{i=1}^{k-1}A_i=B_k.
$$

从而

$$
x\in\bigcup_{i=1}^n B_i.
$$

所以

$$
\bigcup_{i=1}^n A_i
\subseteq
\bigcup_{i=1}^n B_i.
$$

综上，

$$
\boxed{
\bigcup_{i=1}^n A_i=\bigcup_{i=1}^n B_i
}
\quad(n\ge 1).
$$

---

## 4. 求集合列的上极限与下极限

设

$$
A_{2n-1}=\left(0,\frac1n\right),
\qquad
A_{2n}=(0,n),
\quad n=1,2,\ldots
$$

集合列的上极限和下极限分别定义为

$$
\limsup_{n\to\infty}A_n
=
\bigcap_{m=1}^{\infty}
\bigcup_{n=m}^{\infty}A_n,
$$

$$
\liminf_{n\to\infty}A_n
=
\bigcup_{m=1}^{\infty}
\bigcap_{n=m}^{\infty}A_n.
$$

### 上极限

对于任意 $x>0$，取整数 $N>x$。当 $n\ge N$ 时，

$$
x\in(0,n)=A_{2n}.
$$

因此，每个 $x>0$ 都属于无穷多个偶数项 $A_{2n}$，从而

$$
x\in\limsup_{n\to\infty}A_n.
$$

另一方面，所有 $A_n$ 都是 $(0,+\infty)$ 的子集，所以

$$
\limsup_{n\to\infty}A_n\subseteq(0,+\infty).
$$

因此

$$
\boxed{
\limsup_{n\to\infty}A_n=(0,+\infty)
}.
$$

### 下极限

若 $x\le 0$，则 $x$ 不属于任何 $A_n$，因而

$$
x\notin\liminf_{n\to\infty}A_n.
$$

若 $x>0$，则存在正整数 $N$，使得

$$
\frac1N\le x.
$$

当 $n\ge N$ 时，

$$
x\notin\left(0,\frac1n\right)=A_{2n-1}.
$$

因此，任意 $x>0$ 都不属于无穷多个奇数项 $A_{2n-1}$，所以不存在一个指标，使得 $x$ 从该指标开始属于所有 $A_n$。

故

$$
\boxed{
\liminf_{n\to\infty}A_n=\varnothing
}.
$$

最终得到

$$
\boxed{
\limsup_{n\to\infty}A_n=(0,+\infty),
\qquad
\liminf_{n\to\infty}A_n=\varnothing
}.
$$
