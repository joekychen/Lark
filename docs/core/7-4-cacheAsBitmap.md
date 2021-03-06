#Lark Core 编程指南 - 使用位图缓存
如果 Lark 中的设计尺寸增大，无论创建的是应用程序还是复杂的脚本动画，都需要考虑性能和优化。如果内容保持为静态（如矩形 Shape 实例），Lark 不会重绘内容，但是当更改矩阵（设置位置，旋转或缩放等）时，会重绘整个 Shape 实例。

可以通过缓存指定的显示对象来提高 Lark 的性能。让显示结果不常发生改变的显示对象变成一个“图片”，也就是位图版本的实例显示数据。当渲染阶段时， Lark 不再调用实例内部的重绘方法，而是直接使用缓存的位图数据绘制到屏幕上，从而可以提高渲染效率。

注： 被缓存的对象依然可以更新它内部的对象，这时将自动重新创建缓存。

将显示对象的 cacheAsBitmap 属性设置为 true 就会把显示对象缓存成位图形式。

DisplayObject 类的 scrollRect 属性与使用 cacheAsBitmap 属性的位图缓存有关。只有将 cacheAsBitmap 设置为 true 时，才能看到 scrollRect 属性带来的性能优势。有关滚动显示对象内容的详细信息，请参阅[平移和滚动显示对象](7-2-scrollRect.md)。

##是否启用位图缓存
对显示对象启用位图缓存会创建一个独立的位图数据，位图缓存有助于更快地呈示复杂的矢量内容或深层嵌套的显示列表。可能您希望通过启用缓存来提高性能，但是，某些情况下启用缓存并不能提高性能，甚至还会降低性能。本部分介绍在哪些情况下应使用缓存，以及何时使用常规显示对象。

位图缓存提升的总体性能取决于实例数据的复杂程度、要更改的数据量。如果要更改的面积较小，是否开启缓存的差异微乎其微。在部署应用程序之前您可能需要实际测试一下这两种情况。通常情况下，对于内部显示结果很少发生改变的对象，启用位图缓存都能获得较高性能。

####可以启用位图缓存
在以下典型情形中启用位图缓存您可能会看到明显的好处。

--复杂背景图像：包含矢量数据的详细的复杂背景图像。

--滚动文本字段：在滚动文本字段中显示大量的文本。可以将文本放置在您设置为可滚动的具有滚动框（使用 scrollRect 属性）的显示对象中。这可以使指定的实例进行快速像素滚动。当用户滚动显示对象实例时，Lark 会通过将滚动的像素向上移来生成新的看得见的区域，而不是重新生成整个文本字段。

上面这些情况下，启用位图缓存后都可以提高程序运行的流畅性。

####避免使用位图缓存
在错误的环境中使用此功能可能会给程序带来负面影响。使用位图缓存时，请记住下面的准则：

--不要过度使用。每个位图缓存使用的内存都比常规显示对象多，例如，如果舞台上 Sprite 实例的大小为 250 x 250 个像素，缓存它可能会使用 250 KB 内存；如果它是常规（未缓存的）Sprite 实例，则使用 1 KB 内存。这意味着只在需要提高呈示性能时才启用。

--避免缓存过大的显示对象。即使将缓存的显示对象缩小使用，位图数据也还是缓存原始大小的显示对象，将导致占用大量内存（请参阅上一段落）。

--位图缓存通常用于静态（非动画）的显示对象实例。可以拖放或移动实例，但实例的内容不能为动画或更改太多。例如，如果旋转或转换实例，实例将在位图和矢量数据之间进行变化，这种情况将难于处理，并产生负面影响。

--如果将位图缓存与矢量数据混在一起，将增加工作量。

--请不要频繁更改缓存对象的内部显示结果。每一次移动、缩放、倾斜、旋转子显示对象，更改 alpha 或颜色转换，或修改矢量绘图结果，位图缓存都会重绘。如果每一帧都发生这种情况，运行时必须将对象绘制为位图，然后将该位图复制到舞台 上。与仅将未缓存对象绘制到舞台相比，这会导致额外的工作量。缓存和更新频率之间的性能权衡取决于显示对象的复杂性和大小，需要通过测试具体内容来确定。


##启用位图缓存
```  TypeScript
mySprite.cacheAsBitmap = true;
```
将 cacheAsBitmap 属性设置为 true 后，您可能会注意到，显示对象的像素会自动与整个坐标对齐。

即便是将 cacheAsBitmap 设置为 true，如果出现内存不足或平台对画布创建数量有限制，将不创建位图缓存：

