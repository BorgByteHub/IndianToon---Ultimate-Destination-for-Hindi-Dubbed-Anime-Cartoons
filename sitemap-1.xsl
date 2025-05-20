<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
    <xsl:template match="/">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <title>XML Sitemap - IndianToon</title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <style type="text/css">
                    body {
                        font-family: Arial, sans-serif;
                        font-size: 13px;
                        color: #333;
                    }
                    table {
                        border: none;
                        border-collapse: collapse;
                        width: 100%;
                        margin: 20px 0;
                    }
                    th {
                        text-align: left;
                        padding: 10px;
                        background-color: #f2f2f2;
                        border-bottom: 1px solid #ddd;
                    }
                    td {
                        padding: 10px;
                        border-bottom: 1px solid #eee;
                    }
                    tr:hover td {
                        background-color: #f9f9f9;
                    }
                    a {
                        color: #2b6dad;
                        text-decoration: none;
                    }
                    a:hover {
                        text-decoration: underline;
                    }
                    .header {
                        background-color: #003366;
                        color: white;
                        padding: 20px;
                        margin-bottom: 20px;
                    }
                    .wrapper {
                        margin: 20px auto;
                        max-width: 1200px;
                        padding: 0 20px;
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <div class="wrapper">
                        <h1>IndianToon XML Sitemap</h1>
                        <p>This is the sitemap for IndianToon website. It contains <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs.</p>
                    </div>
                </div>
                <div class="wrapper">
                    <table>
                        <tr>
                            <th>URL</th>
                            <th>Last Modified</th>
                            <th>Change Frequency</th>
                            <th>Priority</th>
                        </tr>
                        <xsl:for-each select="sitemap:urlset/sitemap:url">
                            <tr>
                                <td>
                                    <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                                </td>
                                <td><xsl:value-of select="sitemap:lastmod"/></td>
                                <td><xsl:value-of select="sitemap:changefreq"/></td>
                                <td><xsl:value-of select="sitemap:priority"/></td>
                            </tr>
                        </xsl:for-each>
                    </table>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet> 