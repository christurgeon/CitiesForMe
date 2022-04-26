# Style Guide

Each component of the project has a distinct style guide, which defines the conventions that all code should adhere to.

## Backend
The .NET backend follows [Microsoft's C# Coding Conventions](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/inside-a-program/coding-conventions). Some highlights of this style guide are only allowing one statement or declaration per line, using four spaces for tabs, placing braces on a separate line, placing comments on a separate line, and using implicit typing for local variables when the type is obvious or not important. Additionally, classes and methods should be documented using C#'s syntax for [documentation comments](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/documentation-comments).

## Frontend
The React frontend follows [Airbnb's JavaScript Style Guide](https://github.com/airbnb/javascript/blob/master/README.md). Some general conventions are to use camelCase for objects, functions, and instances, PascalCase for constructors and classes, using 2 space tabs, using braces with all multiline blocks, always using `const` or `let` to declare variables, using single quotes for strings, and placing opening braces on the same line.

## Database
The PostgreSQL scripts and queries follow [Simon Holywell's SQL Style Guide](https://www.sqlstyle.guide). Some highlights are using unique, non-abbreviated, non-reserved identifiers, lining up root keywords to all end on the same character boundary, using uppercase for reserved keywords, and using `NUMERIC` and `DECIMAL` types over `REAL` and `FLOAT` types wherever possible.
