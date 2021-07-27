---
title: Jekyll 系列（五）：Hightlight
category: 随笔
tags: [Jekyll]
last_modified_date: 2021-05-25
---

## markdown 解析器

- kramdown

[Github-Page 推荐的解析器](https://help.github.com/articles/migrating-your-pages-site-from-maruku/)

修改配置文件为

```yaml
markdown: kramdown
kramdown:
  input: GFM
```

代码块语法可使用 `替换`

- redcarpet

执行命令 - `gem install redcarpet`

修改配置文件为

```yaml
markdown: redcarpet
```

```yaml
markdown: kramdown # [ maruku | rdiscount | kramdown | redcarpet ]
kramdown:
  input: GFM
  extensions:
    - autolink
    - footnotes
    - smart
  use_coderay: true
  syntax_highlighter: rouge
  # coderay:
  #   coderay_line_numbers:  nil
```

```yaml
markdown: kramdown # [ maruku | rdiscount | kramdown | redcarpet ]
kramdown:
  input: GFM
  syntax_highlighter: rouge # coderay
  syntax_highlighter_opts:
    css_class: highlight
    # default_lang: console
    span:
      line_numbers: false
    block:
      line_numbers: true
      start_line: 1
```

[Jekyll Markdown](http://jekyllcn.com/docs/configuration/#markdown-options):

```yaml
kramdown:
  auto_ids: true
  footnote_nr: 1
  entity_output: as_char
  toc_levels: 1..6
  smart_quotes: lsquo,rsquo,ldquo,rdquo
  enable_coderay: false

  coderay:
    coderay_wrap: div
    coderay_line_numbers: inline
    coderay_line_number_start: 1
    coderay_tab_width: 4
    coderay_bold_every: 10
    coderay_css: style
```

```yaml
plugins:
  - jekyll-paginate
  - redcarpet
  - coderay
  - kramdown-syntax-coderay
  - rouge
```
