"a"
"b"

<Number> = "0" | "1" | "2" | "3" | ... | "9"
<DecimalNumber> = "0" | (("1" | "2" | "3" | ... | "9") <Number>\*)

<PrimaryExpression> = <DecimalNumber> |
  "(" <LogicExpression> ")"

<MultiplicativeExpression> = <DecimalNumber> | 
  <AdditiveExpression> "*" <DecimalNumber> ｜ 
  <AdditiveExpression> "/" <DecimalNumber>

<AdditiveExpression> = <MultiplicativeExpression> | 
  <AdditiveExpression> "+" <MultiplicativeExpression> ｜ 
  <AdditiveExpression> "-" <MultiplicativeExpression>

<LogicExpression> = <AdditiveExpression> | 
  <LogicExpression> "||" <AdditiveExpression> | 
  <LogicExpression> "&&" <AdditiveExpression>