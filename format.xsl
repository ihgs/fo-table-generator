<xsl:stylesheet version="1.1"
        xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
        xmlns:fo="http://www.w3.org/1999/XSL/Format"
        exclude-result-prefixes="fo">
<xsl:output method="xml" version="1.0"
        omit-xml-declaration="no" indent="yes" />
<xsl:attribute-set name="myCell-normalBorder" >
  <xsl:attribute name="font-size">7pt</xsl:attribute>
  <xsl:attribute name="border">1pt solid black</xsl:attribute>
  <xsl:attribute name="text-align">left</xsl:attribute>
</xsl:attribute-set>
<xsl:attribute-set name="myCell-thickBorder" >
  <xsl:attribute name="font-size">7pt</xsl:attribute>
  <xsl:attribute name="border">3pt solid black</xsl:attribute>
  <xsl:attribute name="text-align">left</xsl:attribute>
</xsl:attribute-set>

    <xsl:template match="my_var_main">  
      <fo:root>
        <!-- page style -->
        <fo:layout-master-set xmlns:rx="http://www.renderx.com/XSL/Extensions" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:wx="http://schemas.microsoft.com/office/word/2003/auxHint" xmlns:aml="http://schemas.microsoft.com/aml/2001/core" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:dt="uuid:C2F41010-65B3-11d1-A29F-00AA00C14882">
            <fo:simple-page-master master-name="base-page" page-width="8.26875in" page-height="11.694444444444444in" margin-top="5mm" margin-bottom="5mm" margin-right="10mm" margin-left="10mm">
                <fo:region-body margin-top="5mm" margin-bottom="5mm">
                </fo:region-body>
                <fo:region-before region-name="odd-page-header" extent="11in">
                </fo:region-before>
                <fo:region-after region-name="odd-page-footer" extent="11in" display-align="after">
                </fo:region-after>
            </fo:simple-page-master>
            <fo:page-sequence-master master-name="simple-page">
                <fo:repeatable-page-master-alternatives>
                    <fo:conditional-page-master-reference odd-or-even="odd" master-reference="base-page" />
                    <fo:conditional-page-master-reference odd-or-even="even" master-reference="base-page" />
                </fo:repeatable-page-master-alternatives>
            </fo:page-sequence-master>
        </fo:layout-master-set>
      <!-- end page style -->
      <fo:page-sequence master-reference="simple-page">
        <fo:flow flow-name="xsl-region-body"  font-family="Arial Unicode MS">
            <!-- ここに table をコピー-->
        </fo:flow>
      </fo:page-sequence>
  </fo:root>
</xsl:template>
</xsl:stylesheet>