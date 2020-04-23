# 每周总结可以写在这里
# 编程语言通识

## 形式语言

### 中文、英文

## 非形式语言（乔姆斯基普系）

### 0型（无限制文法）

### 1型（上下文相关文法）

一个词在不同上下文有不同意思

### 2型（上下文无关文法）

一个词在不同上下文都一样意思

### 3型（正则文法）

能用正则表达式解释的文法

## 产生式（BNF）

### <括号括起来的名称表示语法结构名

### 语法结构

- 基础结构

  基础结构称为终结符

- 复合结构

  需要其他语法结构定义。复合结构称为非终结符

### 终结符

- 引号和中间的字符

### 可以有括号

### *表示重复多次

### ｜表示或者

### +表示至少一次

## 图灵完备性

### 命令式

- 图灵机

	- goto
	- if/while

### 声明式

- lambda

	- 递归

## 动态与静态

### 动态

- 在用户的设备/ 服务器上
- 产品实际运行时
- runtime

### 静态

- 在程序员的设备上
- 产品开发时
- compiletime

## 类型系统

### 动态类型系统和静态类型系统

### 强类型弱类型

string + number
string == boolean
能发生隐式类型转换的语言弱类型

### 复合类型

- 结构体

	- 对象

- 函数签名

  函数参数和返回值，参数t1，t2，和返回值构成函数签名。

### 子类型

- 逆变

  凡是能用function<Child>的地方，都能用function<Parent>

- 协变

  凡是能用Array<Parent>的地方，都能用Array<Child>

## 一般命令式编程语言

### atom

- identifier
- literal

### expression

- atom
- operator
- punctuator

### statement

- expression
- keyword
- punctuator

### structure

- function
- class
- process
- namespace

### program

- program
- module
- package
- library