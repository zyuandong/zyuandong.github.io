---
title: Jekyll 系列：Category 和 Tag
category: Others
tag: jekyll
last_modified_date: 2021-05-12
---

tags 或者 tag 区别

+ 生成 post.json 的 `{{ post.tags }}` 能够识别 tags 和 tag；
+ 但获取文章 tag 的 `{{ page.tags }}` 只能够识别 tags，同理 `{{ page.tag }}` 只能识别 `tag`，但通过 for-in 遍历依然能够获取信息。

因此我还是统一定为 tags。

## jekyll-archives

在考虑如何运用 category 和 tag 来丰富站点交互时，发现一个插件 `jekyll-archives`，此插件可以通过配置，自动识别 post 头信息中的 category/categories、tag/tags 生成对应的静态资源，并可以通过类似 `/categories/:name` 这样的地址访问对应类型下的 posts 资源。

其配置简单 .e.g:

```yaml
# _config.yml

plugins:
  - jekyll-archives

jekyll-archives:
  enabled:
    - tags
    - categories
  layouts:
    tag: tag
    category: category
  permalinks:
    tag: tags/:name/
    category: categories/:name/
```

刚开始一切都很顺利，直到部署到 github pages 中，许多问题才开始浮现：

首先是异常的无法区分非英文的 category 和 tag。

在 Mac 中并没有出现此问题，但在 Windows 环境下会出现此问题，并且不是所有非英文 category 、tag 都无法访问，实属诡异。

另外发现的一个问题是：github pages 为了安全考虑，除了白名单上部分插件可以使用外，其他插件都无法在 github pages 中正常使用，jekyll-archives 就不包含在白名单之中。如果想继续使用这类插件，官方给出的解决办法就是在本地将 jekyll 项目转化为静态资源文件，并上传至 github，而不能再是 jekyll 项目源文件。

考虑成本以及 jekyll 现有的功能，最终还是决定放弃 jekyll-archives，而是使用 jekyll 现有的能力来实现 post、category、tag 的资源关联交互。

## categories 结构、样式

{% raw %}

```html
<!-- 2 -->
{% for c in sorted_categories_2 %}
  {% assign category = c | first %}
  {% assign posts = c | last %}
  {% assign level_1_category = "" %}
  {% assign level_2_category_arr = "" | split: "" %}

  {% for p in posts %}
    {% if p.categories[0] == category %}
      {% assign level_1_category = category %}
      {% for sub_c in p.categories %}
        {% assign level_2_category_str = level_2_category_arr | join: ',' %}
        {% if sub_c != level_1_category and level_2_category_str contains sub_c %}
          {% assign level_2_category_arr = level_2_category_arr | push: sub_c %}
        {% endif %}
      {% endfor %}
    {% endif %}
  {% endfor %}

  {% if level_1_category != "" %}
  <li class="level-1">
    <a href="{{ level_1_category | slugify }}">{{ level_1_category }}</a>
    <sup>{{ site.categories[level_1_category] | size }}</sup>
  </li>
    {% for c in level_2_category_arr %}
    <ul>
      <li class="level-2">
        <a href="{{ c | slugify }}">{{ c }}</a>
        <sup>{{ site.categories[c] | size }}</sup>
      </li>
    </ul>
    {% endfor %}
  {% endif %}
{% endfor %}

<!-- 3 -->
{% assign categories = "" | split: "" %}
{% for c in site.categories %}
  {% assign categories = categories | push: c[0] %}
{% endfor %}

{% assign sorted_categories = categories | sort_natural %}

{% for category in sorted_categories %}
<li>
  <a href="{{ site.baseurl }}/categories/{{ category | slugify }}">{{ category }}</a>
  <sup>{{ site.categories[category] | size }} </sup>
</li>
{% endfor %}
```

{% endraw %}

## 参考

[用jekyll和jQuery实现异步加载文章列表](http://yanping.me/cn/blog/2012/10/10/asynchronous-loading-post-list-with-jekyll-and-jQuery/)

[用js在jekyll博客中实现标签云和标签页](http://yanping.me/cn/blog/2013/02/13/generate-tags-with-js-in-jekyll-blog/)

[如何使用Jekyll的Category和Tag](http://www.kthinker.com/post/jekyll-category-and-tag/)

[用jekyll生成json](http://yanping.me/cn/blog/2012/04/19/jekyll-with-json/)

[用jekyll生成包含json变量的js脚本](http://yanping.me/cn/blog/2012/04/20/jekyll-with-js-and-json/)
