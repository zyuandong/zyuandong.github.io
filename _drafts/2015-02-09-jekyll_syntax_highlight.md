---
title: Jekyll 系列（五）：Syntax Highlight
category: 随笔
tags: [Jekyll]
last_modified_date: 2021-05-25
---

技术类型的博客自然少不了示例代码，

## markdown 解析器

[kramdown](https://kramdown.gettalong.org/)

[Markdown Options](https://jekyllrb.com/docs/configuration/markdown/)

[Default Configuration](https://jekyllrb.com/docs/configuration/default/)

### GFM

[GFM(GitHub Flavored Markdown)与标准Markdown的语法区别](https://www.cnblogs.com/36bian/p/7568015.html)

### 配置

## Rouge

[Rouge](http://rouge.jneen.net/)
[pygments](https://pygments.org/)
[List of supported languages and lexers](https://github.com/rouge-ruby/rouge/wiki/List-of-supported-languages-and-lexers)

`rougify list` - list of supported languages
`rougify help style` - list of styles

## highlight.js

[highlight.js](https://highlightjs.org/)

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

![Rouge](https://i.loli.net/2021/08/02/5XYxo78wnm1MWiy.png)

## 参考

- [这是一篇效果示例文章](https://www.yukapril.com/2016/10/19/blog-show.html)

- [Configuration | Jekyll](https://jekyllrb.com/docs/configuration/)

- [Syntax highlighting | GitHub Pages](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll#syntax-highlighting)

- [wx: 学习 jekyll 背后的技术原理（静态网站）](https://mp.weixin.qq.com/s?src=11&timestamp=1622535289&ver=3103&signature=Ugb3Nlzg*4hEd20stLGwLrQufRfwaWWBNyQftc2uWqKeP4Yxk0itXXzlum2PmnEMhkPRdfvHcUlzYv2DwKB6xQ1krLn2sRjX7qkZMqHt6WMEML2u-PQa*o3ESsQTo25K&new=1)
- [前端小课](https://lefex.github.io/)
- [Rouge](https://github.com/rouge-ruby/rouge)
- [jekyll php高亮代码,[Html]Jekyll 代码高亮的几种选择_html/css_WEB-ITnose](https://blog.csdn.net/weixin_34434948/article/details/116058330)
- [Jekyll 使用 Rouge 主题](https://www.cnblogs.com/baiyangcao/p/jekyll_rouge.html)