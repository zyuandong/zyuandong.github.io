---
title: Jekyll 系列：Pagination
category: 随笔
tags: [Jekyll]
last_modified_date: 2021-05-25
---

初始方案：

{% raw %}

``` html
<span class="pagination-box">
  {% if paginator.previous_page %}
    {% if paginator.previous_page == 1 %}
    <a href="{{ site.baseurl }}/home" class="previous">
      <i class="icon-chevron-left"></i>
    </a>
    {% else %}
    <a href="{{ site.baseurl }}/home/page{{ paginator.previous_page }}" class="previous">
      <i class="icon-chevron-left"></i>
    </a>
    {% endif %}
  {% else %}
    <span class="previous cursor-not-allowed">
      <i class="icon-chevron-left"></i>
    </span>
  {% endif %}

  {% for number in (1..paginator.total_pages) %}
    {% if number == 1 %}
    <a href="{{ site.baseurl }}/home" class="number {% unless paginator.previous_page %}is-active{% endunless %}">{{ number }}</a>
    {% else %}
    <a href="{{ site.baseurl }}/home/page{{ number }}" class="number {% if page.url contains number %}is-active{% endif %}">{{ number }}</a>
    {% endif %}
  {% endfor %}

  <span class="mobile-page-number text-tip only-sm">{{ paginator.page }} / {{ paginator.total_pages }}</span>

  {% if paginator.next_page %}
  <a href="{{ site.baseurl }}/home/page{{ paginator.next_page }}" class="next">
    <i class="icon-chevron-right"></i>
  </a>
  {% else %}
  <span class="next cursor-not-allowed">
    <i class="icon-chevron-right"></i>
  </span>
  {% endif %}
</span>
```

{% endraw %}