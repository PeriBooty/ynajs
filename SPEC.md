# YNA spec v0.1.0

## Types

- Text
- Keys
- Commands
- Comments

### Text

Any string without unescaped control characters is treated as string.
```yna
Foo bar
```
Control characters can be escaped using the escape character(">").
```yna
Foo {>bar}
```

### Keys

Keys are static strings and/or objects that can be read and set.

Default keys are given by the engine and are set before running the yna-code.
```yna
{time}
```

Users can define new keys and overwrite previously defined keys by using the corresponding command.
```yna
{set:foo;123;}

{foo}
```

```yna
{set:time;overwritten time;}

{time}
```

#### Default keys

Default keys provided by the engine:
 - {time}: Current timestamp
 - {args}: Joined arguments
 - {arglen}: Amount of arguments
 - {arg1},{arg2}...{arg#n#}: Argument by index

Additional keys can be implemented in specialized engines.

### Commands

Commands are functions that take arguments and output a string.
```yna
{lower:FOO;}
```
Commands can be nested and combined with strings and keys.
Nested commands are evaluated recursively from the inside
```yna
{lower:{slice:0,2;FOO;};}
```

#### Default commands
- {set:#key#;#val#;}: stores a value to a key
- {func:#key#;#val#;}: stores a value to a key, evaluating the value on key lookup
- {when:#val1#;#(eq|neq|gt|ge|lt|le|is|in)#;#val2#;#ifTrue#;[#ifFalse#;]}: checks for the result of the operation and returns output case

- {oneline:#text#;}: Removes all newlines and leading spaces from the text
- {upper:#text#;}: Turns text uppercase
- {lower:#text#;}: Turns text lowercase
- {title:#text#;}: Turns text titlecase
- {rep:#needle#;#haystack#;#replacement#;}: Replaces all occurences of a string
- {parse:#text#;}: Encodes string to an URI
- {slice:#slice#;#text#;}: Slices from a string

- {math:#num1#;#(add|sub|mul|div|idiv|mod|and|or|xor|not)#;#num2#;}: Performs basic math

- {len:#text#;}: Returns length of text
- {time:[#offset#];}: Returns time for the given offset

- {choose:[#val1#];[#val2#];...[#valn#];}: Randomly chooses one of the values
- {wchoose:[#val1#];[#weight1#];[#val2#];[#weight2#];...[#valn#],[#weightn#];}: Randomly chooses one of the values, distributed by weight
- {num:[#min#];[#max#];[#step#];}: Generates a random number in the given range

### Comments

Comments are started by the command control character.
Comments are ignored by the runner.
```yna
{!A comment}
```
