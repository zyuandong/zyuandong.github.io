---
title: Jekyll 系列（三）：Category 和 Tag
category: 随笔
tags: [Jekyll]
last_modified_date: 2021-05-12
---

博客系统中很重要的一点就是关于分类和标签，当文章数量过多时，通过分类和标签，阅读者就能比较快速的找到想要阅读的文章，同时也能够清楚的了解与当前文章有所关联的其它文章。

当我开始搭建博客并设计分类与标签时，我犯难了。标签很好理解，可以看做是一篇文章最核心的主题、属性；但关于分类，我想了许久也没想明白该如何设计才比较合适。

例如：一篇文章的分类是否和标签一样可以多个？分类是否需要分级？等等。。。🤔

最后我意识到：如果将分类设计的很复杂、过多的细分就模糊了分类与标签的区别，反而使得分类越来越标签化。索性最后只留下了技术、工具、生活、随笔四类，如此简化的设计之后，终于收货一丝愉悦感。🎉

最终要实现的目标：

- 可以通过 Category 、tag 过滤出对应的文章列表
- 点击文章跳转至对应详情页

目标比较简单，就下来就开始去实现。

## 方案一：jekyll-archives 实现（有缺陷）

查阅资料之后发现了一个插件： [jekyll-archives](https://jekyll.github.io/jekyll-archives/)，此插件能够通过配置 _config.yml 文件，自动识别 post 头信息中的 category/categories、tag/tags 生成对应的静态资源，并可以通过类似 `/categories/:name` 这样的地址访问对应分类下的文章资源。

首先看一下 _config.yml 文件的相关配置：

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

可以查看 [jekyll-archives 文档](https://jekyll.github.io/jekyll-archives/) 来详细了解各个配置项的意义。

## 方案二：Jekyll 原生实现

根据目标得知，需要得到 Category 、Tag 对应的文章信息，并且文章信息至少需要包含标题及对应的链接地址。如何得到这些信息呐？

通过查看 Jekyll 文档，可以发现 Jkeyll 中有一个全局对象 `site`，其包含了很多的关键信息：

| 变量                                           | 说明                                                |
| :--------------------------------------------- | :-------------------------------------------------- |
| `site.pages`                                   | 所有页面信息的列表                                  |
| `site.posts`                                   | 所有文字信息的列表                                  |
| `site.categories` / `site.categories.CATEGORY` | 所有分类信息的列表 / 所有在分类 `CATEGORY` 下的文章 |
| `site.tags` / `site.tags.TAG`                  | 所有标签信息的列表 / 所有在标签 `TAG` 下的文章      |

有了这些数据的支持，这下就方便多了，接下来就是考虑该如何去使用这些数据。

### 思路一：解析页面渲染

在 _includes 文件夹下创建 categories.html 和 tags.html 文件，使用 `site.categories` 和 `site.tags` 生成页面内容。

以 categories.html 为例：页面为上下结构，上部分为 category 列表；下部分为每一个 category 所对应的文章列表块。最后通过 JS 脚本控制点击上部分的 category 时，下部分对应文章列表块的显隐。

tags.html 实现方式同上。

### 思路二：生成资源数据

利用 Jekyll 的能力，我们可以提前构造一份包含 Category 和 Tag 相关资源的数据文件（json 格式），当博客部署之后，这份数据文件就可以被当做静态资源被访问，拿到数据之后就可以实现这个功能。

首先我们需要使用 `site.categories` 、 `site.tags` 构造这份文件，以 /datas/categories.json 为例：

{% raw %}

```liquid
---
---

{
  "categories": [
    {% for category in site.categories %}
    {
      "name": "{{ category | first }}",
      "url": "{{ site.baseurl }}/categories#{{ category | first | slugify | url_encode }}",
      "datas": [
        {% for post in category.last %}
        "{{ post.title }}"{% if forloop.last == false %},{% endif %}
        {% endfor %}
      ]
    }{% if forloop.last == false %},{% endif %}
    {% endfor %}
  ]
}
```

{% endraw %}

❗**注：文件最开始的两行不能省略，省略后将不会被 Jekyll 识别并解析**

部署之后，此文件将会被 Jekyll 解析生成最终内容符合 JSON 规范的目标文件：`_site/datas/categories.json`，最后我们可以通过 http 的方式获取这份文件，得到我们需要的数据。

![Category 和 Tag 数据的生成过程](https://i.loli.net/2021/07/30/5w3sFVb6mq1rtRP.png)



## 6. categories / tags 设计

[jekyll-archives](https://jekyll.github.io/jekyll-archives/)

category 或 tag 中带有空格、/ 等特殊符号

tags 或者 tag 区别

{% raw %}

- 生成 post.json 的 `{{ post.tags }}` 能够识别 tags 和 tag；
- 但获取文章 tag 的 `{{ page.tags }}` 只能够识别 tags，同理 `{{ page.tag }}` 只能识别 `tag`，但通过 for-in 遍历依然能够获取信息。

{% endraw %}

因此我还是统一定为 tags。

## 1. jekyll-archives



其配置简单：

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

另外发现的一个问题是：github pages 为了安全考虑，除了 [白名单](https://pages.github.com/versions/) 上部分插件可以使用外，其他插件都无法在 github pages 中正常使用，jekyll-archives 就不包含在白名单之中。如果想继续使用这类插件，官方给出的解决办法就是在本地将 jekyll 项目转化为静态资源文件，并上传至 github，而不能再是 jekyll 项目源文件。

考虑成本以及 jekyll 现有的功能，最终还是决定放弃 jekyll-archives，而是使用 jekyll 现有的能力来实现 post、category、tag 的资源关联交互。

## 2. 结构、样式

{% raw %}

实现一：区分一、二级分类

```liquid
{% assign sorted_categories = site.categories | sort_natural %}

{% for c in sorted_categories %}
  <!-- 开始遍历所有 category -->
  {% assign category = c | first %}
  {% assign posts = c | last %}
  {% assign category_group = "" | split: "" %}

  {% for p in posts %}
    <!-- 遍历 posts，获取当前 category 对应 post 下的所有 categories -->
    {% if category == p.categories[0] %}
      {% assign category_group = category_group | concat: p.categories %}
    {% endif %}
  {% endfor %}

  <!-- 去重 -->
  {% assign uniqed_category_group = category_group | uniq %}

  <!--
    uniqed_category_group 为一组分类,
    [0] 为当前组的一级分类
    [1, .., length-1] 为二级分类
  -->
  {% for c2 in uniqed_category_group %}
    {% if forloop.first %}
    <li class="level-1{% if uniqed_category_group.size > 1 %} has-level-2{% endif %}">
      <a href="{{ c2 | slugify }}">{{ c2 }}</a>
      <span class="text-tip">{{ site.categories[c2] | size }} Posts</span>
    </li>
    {% else %}
    <ul class="{% if forloop.last == true %}last-level-2{% endif %}">
      <li class="level-2">
        <a href="{{ c2 | slugify }}">{{ c2 }}</a>
        <span class="text-tip">{{ site.categories[c2] | size }} Posts</span>
      </li>
    </ul>
    {% endif %}
  {% endfor %}
{% endfor %}
```

实现二：不区分一、二级分类

```liquid
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

## 3. 参考

- [GitHub Pages](https://pages.github.com/)

- [用 jekyll 和 jQuery 实现异步加载文章列表](http://yanping.me/cn/blog/2012/10/10/asynchronous-loading-post-list-with-jekyll-and-jQuery/)

- [用 js 在 jekyll 博客中实现标签云和标签页](http://yanping.me/cn/blog/2013/02/13/generate-tags-with-js-in-jekyll-blog/)

- [如何使用 Jekyll 的 Category 和 Tag](http://www.kthinker.com/post/jekyll-category-and-tag/)

- [用 jekyll 生成 json](http://yanping.me/cn/blog/2012/04/19/jekyll-with-json/)

- [用 jekyll 生成包含 json 变量的 js 脚本](http://yanping.me/cn/blog/2012/04/20/jekyll-with-js-and-json/)
