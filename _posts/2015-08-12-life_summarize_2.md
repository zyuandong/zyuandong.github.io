---
layout: default
title: 群处守住嘴，独时守住心
tags: 感悟
---

# 群处守住嘴，独时守住心

[
{% for post in site.posts %}
	{
		"title": "{{ post.title }}",
		"url": "{{ site.url }}{{ post.url }}",
		"date": "{{ post.date | date: '%Y-%m-%d' }}",
		"tags": [
			{% for tag in post.tags %}
				"{{ tag }}"
				{% if forloop.last == false %},{% endif %}
			{% endfor %}
		]
	}
	{% if forloop.last == false %},{% endif %}
{% endfor %}
]