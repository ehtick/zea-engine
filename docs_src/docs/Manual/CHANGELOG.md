---
sidebar_position: 5
---
# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [4.4.0](https://github.com/ZeaInc/zea-engine/compare/v4.3.0...v4.4.0) (2022-04-26)


### Features

* Build system now generates a NodeJS compatible cjs build. ([3580137](https://github.com/ZeaInc/zea-engine/commit/35801373709c44dbb34940937416826e8239303a))
* GLRenderer now support rendering outlines using a new geometry base technique for cleaner outlines. ([3ae4fb0](https://github.com/ZeaInc/zea-engine/commit/3ae4fb09021dfe3ba984ee3687773df18c5bdd48))
* Improved load times using a more efficient web worker class called the WorkerPool. ([640569e](https://github.com/ZeaInc/zea-engine/commit/640569edca5b7e0341e333f727e3b9888a62d364))
* XRef loading now supports firing a callback on the asset load context to generate the URL for the XRef ([7c6b0cb](https://github.com/ZeaInc/zea-engine/commit/7c6b0cb57ccdf71e194ae350c8cf2aa6c8989225))
* ZCAD loading now spreads work more evenly across workers. When many files are loading, we can reduce memory requirements. ([ae96a26](https://github.com/ZeaInc/zea-engine/commit/ae96a26b1d6ddcec5c50d2036898f7b223acac7a))


### Bug Fixes

* XRef cloning would result in incorrect transformations. ([c229a64](https://github.com/ZeaInc/zea-engine/commit/c229a64272900f2fcf02e9e5534f4107aed2c208))
* Address regression on older Safari browsers that still only support WebGL1 ([53576fc](https://github.com/ZeaInc/zea-engine/commit/53576fca34efda0d0e4c8a1c1be55e8d800ed0f5))
* Applied workaround to address performance regression in Safari. ([846cacd](https://github.com/ZeaInc/zea-engine/commit/846cacd56f0ce11669f9d358c9e72d2595e5aa5f))
* CADAsset now generates a useful error message when loading zcad files that are corrupt in some way. ([8341c66](https://github.com/ZeaInc/zea-engine/commit/8341c6662ce2b63914aacc2b086b8cda83656ccb))
* CADAssets would fail to resolve the load promise if nested XRefs failed to load. ([487bc0a](https://github.com/ZeaInc/zea-engine/commit/487bc0aad7679846fd26c48d8a638cced4ef033c))
* Cleaned up TreeItem opacity propagation. ([d22a957](https://github.com/ZeaInc/zea-engine/commit/d22a9571cc719208453f527210d000adea87d946))
* Edge lines now blend correctly over the top of faces. ([cab33cd](https://github.com/ZeaInc/zea-engine/commit/cab33cdfa2c7840b198b25805a00ca86101a8ebd))
* Fixed a crash on systems unable to run WebGL2 code, such as iOS devices that have not yet been updated to iOS 15. ([696eb1f](https://github.com/ZeaInc/zea-engine/commit/696eb1fee038785c7047807cddcad6527d5224ca))
* Items that were initially culled, but becoming visible could cause artifacts in the rendering ([b66c701](https://github.com/ZeaInc/zea-engine/commit/b66c7013e5bc61c66908c61f9194a3a6be7ef3d3))
* Loading zcad files containing XRefs now correctly resolves the promise. ([b28a19e](https://github.com/ZeaInc/zea-engine/commit/b28a19e40cbcb656b30f01f82007398388db36fe))
* Removed redundant logging. Logging should be implemented at the application level. ([191033a](https://github.com/ZeaInc/zea-engine/commit/191033af0c642413ffbf8309cd47975e71c4d5bb))
* removed static material configuration in PMIItem as it threw exceptions (silent) exceptions during load. ([ad39a8f](https://github.com/ZeaInc/zea-engine/commit/ad39a8ff8b984ffeb63b2d0dd411d2ab46d18f66))
* Version 3.11.0 and below of the C++ libraries were not correctly exporting points 'sub-geoms'. The loading code now handles loading these files. ([4004a0a](https://github.com/ZeaInc/zea-engine/commit/4004a0a2220db2d2ec0efa59b27dbbf30d89a66f))
* When loading multiple assets using a shared context, the units value would be modified during load, causing the subsequent a ([fea04aa](https://github.com/ZeaInc/zea-engine/commit/fea04aaa1510e9caf81576bbd0d2d61a801ec0fa))

## [4.3.0](https://github.com/ZeaInc/zea-engine/compare/v4.2.0...v4.3.0) (2022-03-17)


### Features

* BaseClass and BaseEvent classes are now exported by the engine. ([eaf61ae](https://github.com/ZeaInc/zea-engine/commit/eaf61ae3298c259bd7ac0f22406fe8096a224b6f))
* CADAsset now has a 'FileUnits' parameter that can be displayed by our parameter display widgets. ([82d1d81](https://github.com/ZeaInc/zea-engine/commit/82d1d813753e38ad6b88aa6d8ad547da8d87be7b))
* CADAsset now logs the version and SDK used to produce the zcad file it is loading. ([5215e6d](https://github.com/ZeaInc/zea-engine/commit/5215e6d2b3f2c0ae983730025bab62e718f567f2))
* CADAsset.loadMetadata now support taking a url to the .zmetadata file, so that it can be explicitly specified, instead of inferred. ([7b25f09](https://github.com/ZeaInc/zea-engine/commit/7b25f0913d97854630e4bb26200da861b718fb5e))
* Clicking on PMIText has been made easier by generating a plane to fill in the background, so pointer events are always caught when moving the mouse. ([3461e38](https://github.com/ZeaInc/zea-engine/commit/3461e38569bbd139591aba57980eee2d57f904c0))
* FlatSurfaceShader and FlatSurfaceMaterial now provide a new 'Overlay' param that enables geometry to be rendered on top of other geometry in the scene. Similar to the LinesShader and PointsShader currently work. ([a070f0a](https://github.com/ZeaInc/zea-engine/commit/a070f0a4620a5fa8a2549f2fbfbbddc394313fc3))
* PMIView now correctly sets up CuttingPlanes. ([09ca588](https://github.com/ZeaInc/zea-engine/commit/09ca58872d1910616d0988498e625337f78d606b))


### Bug Fixes

* A regression was fixed in visibility toggling that affected only the new CompoundGeometry items available in zcad 3.9.0 and above. ([624596e](https://github.com/ZeaInc/zea-engine/commit/624596ee1ca6eed6936c4862c33ed724c2dd61c1))
* Disable multidraw in Safari ([686ede4](https://github.com/ZeaInc/zea-engine/commit/686ede4ab1d73420d67b1fe7e981c2d0a2eac301))
* Fixed an exception thrown when an Item was made transparent, and then a mouseover occurred ([fb0c08f](https://github.com/ZeaInc/zea-engine/commit/fb0c08f63116c620e74148398bf8d56340548bcd))
* If an item was not visible when the CADAsset was initially loaded, in some cases could not be made visible. ([3fce9ad](https://github.com/ZeaInc/zea-engine/commit/3fce9ad112ccef121de8ffe949cfbb300657e82f))
* Mesh items visibility was in some cases, not being honored due to a regression caused by the integration of the occlusion culling system. ([1f5816a](https://github.com/ZeaInc/zea-engine/commit/1f5816ae6085954a337267eef0bbc2578d2bee4f))
* PMI highlighting now modifies the drawn color of the PMI text geometries. ([4070864](https://github.com/ZeaInc/zea-engine/commit/4070864d7f0c3c72717c57942ec8887cc1190c46))
* PMIView activation now correctly configures the orthographic Viewport height. ([62afcdd](https://github.com/ZeaInc/zea-engine/commit/62afcdd4a1a6a97cdf7782ff1570a917c8af166a))
* Progress bars now complete when loading zcad files with steaming geoms. ([45a13fb](https://github.com/ZeaInc/zea-engine/commit/45a13fb798f62f96cac494eb547f359abfaf009f))
* Re-enable contextual menus ([c291b4a](https://github.com/ZeaInc/zea-engine/commit/c291b4a7a93cf06e94fb605bc423a2f4be8b06e6))
* XRefs in large shattered assemblies would cause name collisions due to losing their unique name. ([4505801](https://github.com/ZeaInc/zea-engine/commit/45058016908b163373a7f399e9621e8b6e268c48))
* XRefs in large shattered assemblies would cause name collisions due to losing their unique name. ([133f373](https://github.com/ZeaInc/zea-engine/commit/133f3730f78053c7f3c0b44aa0517fb08e71eb59))
* XRefs will no longer try to load if a resource dictionary was provided, but no mapping was given for the XRef source file. ([6503835](https://github.com/ZeaInc/zea-engine/commit/6503835aa1d28a88ea9ef240bf24010edb54985b))

## [4.2.0](https://github.com/ZeaInc/zea-engine/compare/v4.1.1...v4.2.0) (2022-02-15)


### Features

* Added getHighlightName to TreeItem to return the name of the current highlight. ([94563c8](https://github.com/ZeaInc/zea-engine/commit/94563c8f479a864f18fa1b72b6c6eb69686a642e))
* Compressed geometries version 3.9.1 and above now store quantized vertices using 16bits per channel for positions and textureCoords. This improves compression quality while also reducing zcad file size. ([fbe8c02](https://github.com/ZeaInc/zea-engine/commit/fbe8c02ffabd826e0583f91f4b05047d05a263c1))
* Duplicate registration of classes now fails on the second attempt, instead of overwriting previous classes. ([3f0e5cc](https://github.com/ZeaInc/zea-engine/commit/3f0e5ccb9e320cd6d4527a8c7d22ccbc31c48311))
* Implemented Box2Parameter and Box3Parameter to store custom data loaded from zcad. ([6422103](https://github.com/ZeaInc/zea-engine/commit/64221034d87a9870bd9e3c134cba7ad6d388c2df))
* Implemented CompoundGeom and GLGeomItemSetMultiDrawCompoundGeom to support geometries featuring multiple geom geoms of different primitive types. ([21f2370](https://github.com/ZeaInc/zea-engine/commit/21f237052961eb9a2b60277394f6b9718d3cd3ac))
* ResourceLoader now caps concurrent resource requests at 2000, thereby addressing an issue where the browser generates errors if too many resources are created at the same time. ([e22dbd5](https://github.com/ZeaInc/zea-engine/commit/e22dbd580bf7d9acfae7e2bd4cb765bf99e96809))
* The Renderer now tracks the number of visible triangles, lines and points, giving useful feedback to the developer. ([9bf084c](https://github.com/ZeaInc/zea-engine/commit/9bf084c8cd9387be1f79a7bae14e14c52cbb93ce))


### Bug Fixes

* [#581](https://github.com/ZeaInc/zea-engine/issues/581) - When an InstanceItem clones, it must also cone the reference item when it asynchronously clones. ([b77ee0b](https://github.com/ZeaInc/zea-engine/commit/b77ee0b78d670f870858f21b031da96692490ac7))
* A regression in bounding box calculation meant instanced geometries could have the incorrect bounding box. ([f648494](https://github.com/ZeaInc/zea-engine/commit/f6484941f774266ff6d39c984d142e7628de5dab))
* A regression in the Math library was fixed. Inverting Xfo values that contained non-uniform scale values would not correctly invert the scale component. ([a972289](https://github.com/ZeaInc/zea-engine/commit/a9722896c7a52f6fd1fe266a33a08b9559a60518))
* An exception was thrown in the culling worker if an item was removed from the renderer after being considered in the view. ([71edd57](https://github.com/ZeaInc/zea-engine/commit/71edd57b9bad9c585b73f68db06777292abf58c1))
* Blending is now disabled while debugging the GeomDataBuffer ([f204789](https://github.com/ZeaInc/zea-engine/commit/f204789686b8939f4719f007de7f70a17f6bfc46))
* Cleaned up bug causing bounding box to always be considered dirty. ([07176a6](https://github.com/ZeaInc/zea-engine/commit/07176a6e700573e67b63bc95eaf21832708b8fcc))
* Correctly implemented 'clone' option in BinReader. ([6514343](https://github.com/ZeaInc/zea-engine/commit/6514343c2d424d6813d8534768f40a5cbf55ca0c))
* Fixed WebGL error when occlusion culling occurs before the first GeomData rendering. ([61e14f8](https://github.com/ZeaInc/zea-engine/commit/61e14f8104afb3a94e2c5b733961afed9ba6b8e3))
* items being un-culled before being drawn for the need to be added to the dirtyGeomItems so the buffers get populated. ([367c9f6](https://github.com/ZeaInc/zea-engine/commit/367c9f69816b69bd646da281cf154ac495df4a08))
* Persisted Materials now can be reloaded constructing the concrete material class. e.g. SimpleSurfaceMaterial instead of just Material ([9382989](https://github.com/ZeaInc/zea-engine/commit/93829895fbae0dc8f0e15ef67d01a6b8a3518b2d))
* Quat.slerp threw an exception if the 2 quats were identical or very similar. Slerp now assumes that the angle is always 0..PI/2 ([c169837](https://github.com/ZeaInc/zea-engine/commit/c16983722a0d91fe82cdc9e2d2630362acdb22c9))
* Transparent geometries, including lines, were not correctly un-culled when the camera moved. Meaning that once a line or transparent geometry went offscreen, it would never be rendered again. ([4f45024](https://github.com/ZeaInc/zea-engine/commit/4f4502465d49685be97cab48d854e721976bccdc))

### [4.1.1](https://github.com/ZeaInc/zea-engine/compare/v4.1.0...v4.1.1) (2022-02-03)


### Bug Fixes

* A crash when loading multiple assets using a shared AssetLoadContext. ([8a2eb6a](https://github.com/ZeaInc/zea-engine/commit/8a2eb6ae32ef13d7c1ff5646fbecc9eae0d80316))
* An exception was thrown in the culling worker if an item was removed from the renderer after being considered in the view. ([e2ac458](https://github.com/ZeaInc/zea-engine/commit/e2ac458171f759726400ae97629b10f9703acf8d))
* Blending is now disabled while debugging the GeomDataBuffer ([7511f88](https://github.com/ZeaInc/zea-engine/commit/7511f88af8229c8ef6bcaf755e506665f82df269))
* Fixed regression in Multi-Draw when items visibility changes. ([#669](https://github.com/ZeaInc/zea-engine/issues/669)) ([e53663d](https://github.com/ZeaInc/zea-engine/commit/e53663dbe37f3f000b25650c6be3d3973596208c))
* Fixed WebGL error when occlusion culling occurs before the first GeomData rendering. ([caf19f4](https://github.com/ZeaInc/zea-engine/commit/caf19f4b7af456984561545e63f189d099965203))
* Transparent geometries, including lines, were not correctly un-culled when the camera moved. Meaning that once a line or transparent geometry went offscreen, it would never be rendered again. ([b1c5b35](https://github.com/ZeaInc/zea-engine/commit/b1c5b354f4602cc5dbe314e8456b20ed53d73bde))

## [4.1.0](https://github.com/ZeaInc/zea-engine/compare/v4.0.1...v4.1.0) (2022-01-21)


### Features

* Added CameraManipulator.zoomTowardGeomUnderCursor. This option enables zooming towards the point under the mouse. By default now, the current framing is maintained during zoom. ([df887b4](https://github.com/ZeaInc/zea-engine/commit/df887b48b96499b3c9aafc7971c94bd32a62bcc7))
* Cuboid can be generated without normals and texture coordinates. Used in the new occlusion culling feature. ([312e3fe](https://github.com/ZeaInc/zea-engine/commit/312e3fec8f5717608f016ea76c8d103d792cd36c))
* DataImage can now be loaded with a WebGLTexture object and used in the scene. Very helpful for debugging rendering textures. ([fa6e3b3](https://github.com/ZeaInc/zea-engine/commit/fa6e3b3bbbe9d0ea076c522d221ad8e9a1d8461d))
* GLRenderer now assumes material color values are in linear space as the color values in ZCAD files are always linear. A new option was added to the renderer to force gamma space color values to be used. ([84a802b](https://github.com/ZeaInc/zea-engine/commit/84a802b29bfe6a7bc877c2eceea93fcb27041f16))
* GLRenderer now support GPU based occlusion culling that improves performance by reducing the number of drawn geometries. ([c9762d2](https://github.com/ZeaInc/zea-engine/commit/c9762d2ff52937ab3ebee25d4189142f27f3b799))
* GLScreenQuad now supports binding without providing a texture. ([852e631](https://github.com/ZeaInc/zea-engine/commit/852e6319d8fea72fcd265262ed805c92d9c51254))
* GLViewport helper method that calculates a 2d position from a 3d world coordinate. ([#614](https://github.com/ZeaInc/zea-engine/issues/614)) ([215929a](https://github.com/ZeaInc/zea-engine/commit/215929acc8db804f84bdebead7ca238c85bfe573))
* Holding ctrl while using the mouse wheel now moves the user forward. ([82a1105](https://github.com/ZeaInc/zea-engine/commit/82a110595594767d35124a68068b44852c2f197f))
* Implemented `getNumTriangles` on Mesh, which calculates the number of triangles based on the face counts. ([4d74050](https://github.com/ZeaInc/zea-engine/commit/4d740508f26755343ed6743bcefd82bb14ba682d))
* Material Color parameters now have a `colorSpace` value which determines if the value is in linear of gamma space. By default color values are in Gamma space, but values loaded from files are assumed to be in Linear space. ([83a52eb](https://github.com/ZeaInc/zea-engine/commit/83a52ebcbe94807420748792544b798fd7b49fcb))
* Move `pointerRay` value up one level in the class hierarchy so all pointer events, even those emitted by XR controllers now provide a `pointerRay` that is used in hit testing. ([b0250dd](https://github.com/ZeaInc/zea-engine/commit/b0250ddd6b495b6e99af80662b9c31a62cdb0e82))
* VRController now provides a `raycastDist` property that controls the distance of the ray used to detect geometries. ([2b43375](https://github.com/ZeaInc/zea-engine/commit/2b4337540a2361e84adc93b9f6b06c93a4b9c301))
* XRController now emits 'buttonPressed' and 'buttonReleased' events when users press buttons aside from the main trigger button. ([b452a08](https://github.com/ZeaInc/zea-engine/commit/b452a08dbb9c62501820f700500af803838fd996))


### Bug Fixes

* [#581](https://github.com/ZeaInc/zea-engine/issues/581) - When an InstanceItem clones, it must also cone the reference item when it asynchronously clones. ([59e8a0b](https://github.com/ZeaInc/zea-engine/commit/59e8a0b24ebc428f8ec23613434377e1e9892721))
* [#595](https://github.com/ZeaInc/zea-engine/issues/595) ensure the XRControllerEvent has a reference to the VRViewport. ([c964784](https://github.com/ZeaInc/zea-engine/commit/c964784c5569c709bd5e966a81696974c2299dfe))
* A warning was generated when replacing an image on a MaterialColorParam due to trying to remove a listener that was never added. ([9b265fc](https://github.com/ZeaInc/zea-engine/commit/9b265fc1fa417f4e3aa120c0fe2c353876cc1266))
* Addressed double-initialization issue causing exception in the WebXR emulator. ([fe8f8c1](https://github.com/ZeaInc/zea-engine/commit/fe8f8c19e88bd3e669c1e04bda2102f791f68a48))
* All XR classes are now exported to make their types available. ([#660](https://github.com/ZeaInc/zea-engine/issues/660)) ([4e9c852](https://github.com/ZeaInc/zea-engine/commit/4e9c852fd59589c9fd0bf768d82a9b258829ad84))
* At the end of an XR Session, the frustum is re-culled using the regular camera. ([3be9fb4](https://github.com/ZeaInc/zea-engine/commit/3be9fb48e7268d97a52c07608863409ffe11b035))
* Captured events no longer propagate to other items. ([2046984](https://github.com/ZeaInc/zea-engine/commit/2046984475bd81b98ffac4c15d5e842370edc06a))
* Cleaned up exception thrown when loading an obj asset referencing materials. ([080a985](https://github.com/ZeaInc/zea-engine/commit/080a985e80972c71ed554bd7ffa0fecd429ceb33))
* Cleaned up huge performance issue loading large assemblies. Listening to changes the GLGeomItemLibrary caused a massive problem. ([69ba155](https://github.com/ZeaInc/zea-engine/commit/69ba155746a2b41ed7113a032153d460a177b990))
* Cloning custom material types, like FlatSurfaceMaterial now results in a new FlatSurfaceMaterial instead of a generic Material class. ([7a9f5c2](https://github.com/ZeaInc/zea-engine/commit/7a9f5c2ff2f35bd1d03078311c4457fe9cc6a85e))
* Cloning items in the tree now correctly clones the 'isSelectable' property. ([11f467e](https://github.com/ZeaInc/zea-engine/commit/11f467ea386b6d1294836b01d8a931c8ea6e8bdc))
* Cutting Plane values on the BaseGeomItem are now initialized to reasonable values. ([c983f19](https://github.com/ZeaInc/zea-engine/commit/c983f19de3a3020d7f23ae435c178b55b7dcf432))
* Debugging GeomData buffer is now possible when silhouettes are being displayed. ([8cc3439](https://github.com/ZeaInc/zea-engine/commit/8cc3439c10a1f0a26c4db37b3239352ff4466f5c))
* Double taps were being generated on non-iOS devices due to mouse events being emulated after real touch events were generated. This is now fixed. ([4836a48](https://github.com/ZeaInc/zea-engine/commit/4836a48b4b292eac647e5d19b86c56b4455710ba))
* Each XRController now has a separate 'capture' item for UI interactions. ([2381c36](https://github.com/ZeaInc/zea-engine/commit/2381c36458d086ba12bc6907cf111a1df4e043e1))
* Exceptions where thrown when a scene consisted of many different textured items and one was highlighted dynamically. ([cbd1c2c](https://github.com/ZeaInc/zea-engine/commit/cbd1c2ccff31a5c3b9ad8739bd0b211a13d09d79))
* Fixed WebGL error caused by a GLRenderTarget.unbindForWriting trying to re-bind a previous fbo it should have been null ([2b2597b](https://github.com/ZeaInc/zea-engine/commit/2b2597b21ea2b28241610e88fa03f5b3860d8710))
* GLRenderTarget now correctly binds the TEXTURE_MIN_FILTER and TEXTURE_MAG_FILTER to its generated textures. ([8eb7a90](https://github.com/ZeaInc/zea-engine/commit/8eb7a905b3f2edb3a6ae335d3b536c6b40a148e3))
* GLTexture2D now correctly infers the internalFormat for RGB format textures. ([5679167](https://github.com/ZeaInc/zea-engine/commit/5679167397e30cdd104c1d8d20a567293ef46951))
* Labels with the fixed size on screen value set to 'true' now rendered correctly in VR. ([4e18cad](https://github.com/ZeaInc/zea-engine/commit/4e18cad1e101c30e7cb980ac51b0b14089adfa46))
* Pointer click distance is now correct in orthographic cameras.(This was a regression in 4.0.0) ([1fcfd56](https://github.com/ZeaInc/zea-engine/commit/1fcfd56da5c106eccb95e0736978df7c4ade9310))
* ProcessTextureParams now checks for wrapS and wrapT in the parsers provided by the image. ([4af31da](https://github.com/ZeaInc/zea-engine/commit/4af31da2dff769dd9d49b8f9787bb6840dc2c8c9))
* RaycastWithProjection and raycastCluster now are correctly depth tested. ([87a945f](https://github.com/ZeaInc/zea-engine/commit/87a945f3e3fa0f454c8439fcdfac13e3f80bd864))
* Textured materials are now correctly unbound addressing a WebGL error: WebGL: INVALID_ENUM: activeTexture: texture unit out of range ([da78764](https://github.com/ZeaInc/zea-engine/commit/da78764ecb6933c4b4ae7039206edf9a7ea3b557))
* The camera now orbits around the clicked position, even when clicking in empty space. ([52b1826](https://github.com/ZeaInc/zea-engine/commit/52b18262a29e9e9933fcbeea82d30e7c853fea9d))
* The WalkMode on the CameraManipulator is working again. ([085a3b0](https://github.com/ZeaInc/zea-engine/commit/085a3b0cdbac6b1b53d2091f6ad654f3810156ff))
* Window zoom changes now cause the canvas to be resized. ([fa13044](https://github.com/ZeaInc/zea-engine/commit/fa1304401d1ad088d2a6d7631d7e192cf7c0bea6))
* Xfo.multiply generated incorrect results if the LHS Xfo had non-uniform scale. ([22cb841](https://github.com/ZeaInc/zea-engine/commit/22cb841fb998450919273ddf3b6d057e0848981e))
* XR Controller ray casting distance and 'dist' value in the intersectionData are now corrected for stage scale. ([9a9d0f3](https://github.com/ZeaInc/zea-engine/commit/9a9d0f318492e7d53b7cbe345a15b381461ea9ff))

### [4.0.1](https://github.com/ZeaInc/zea-engine/compare/v0.0.4...v4.0.1) (2021-11-25)


### Bug Fixes

* Cleaned up auto near/far plane auto adjust code so that the near plane gets moved away when zooming out. ([17f037e](https://github.com/ZeaInc/zea-engine/commit/17f037e95515c10778f8db5d703b4871a2bd6000))
* Cleaned up regression when loading ZCAD files containing points materials. ([92ebb71](https://github.com/ZeaInc/zea-engine/commit/92ebb71807fa8435d235c87dcc063a089bb409c4))
* ES modules support ([1d49056](https://github.com/ZeaInc/zea-engine/commit/1d4905648c8253aa66b749afef81e6ebd55b39ae))
* KinematicGroup was not calling super.bindItem(), which meant pointer events were not propagating from members to the group. ([0e454dd](https://github.com/ZeaInc/zea-engine/commit/0e454dd60437036152e26db7c7792f5545f14b56))
* Near and Far planes are now automatically adapted by 4 orders of magnitude. ([7000916](https://github.com/ZeaInc/zea-engine/commit/70009162e6e1fb662c9a373d9df90600ce0e76e0))
* Parameter becomes dirty by setting 'clean' just prior to calling 'setDirty' to ensure a change in state. ([21b1440](https://github.com/ZeaInc/zea-engine/commit/21b1440f678a949000ae1f2811cf58b9a9faa571))
* When an OperatorOutput with mode OP_READ_WRITE is connected to a parameter, the parameter should be dirtied back to the first OP_WRITE index. ([145c45a](https://github.com/ZeaInc/zea-engine/commit/145c45a77397e1f663a720eb3fb6ce3e3cabf58d))
* When deleting the VAO, ensure to detach the indexBuffer first. ([991c2b1](https://github.com/ZeaInc/zea-engine/commit/991c2b1f9f26cc7400fbcf7df1e724196d4b7c69))

## [4.0.0](https://github.com/ZeaInc/zea-engine/compare/v3.12.3...v4.0.0) (2021-11-10)

Version 4.0.0 is a major release for Zea Engine, as the entire codebase was ported and updated to work with TypeScript. This change caused a few breaking changes as TypeScript did not allow methods with any ambiguity in the signatures. 
Porting to TypeScript addressed a wide range or minor issues, picked up by the strict typing of TypeScript. 

A second and very important benefit of the port to TypeScript, is to provide TypeScript support within client developed applications.
We highly recommend you install the engine and its libraries as dependencies using npm, yarn or your favorite package manager, and import the engine into your code using the bundler tools that come with React or Svelte. 

### Old code
Previously, our engine did not support module bundlers for a few technical reasons that have now been addressed. Instead, we recommended users load our engine using script tags, and then access the classes using a global variable. This approach had a few concerns and limitations. 

* The engine code was not installed in a clients application, creating a dependency on servers such as jsDelivr.
* using incomplete version numbers, like the one shown below, caused automatic and silent updates to the engine on already deployed applications. These updates sometimes had unintended negative consequences.
* Any other resources in the module bundle were not available, such as TypeScript definitions.

```html
<script  src="https://cdn.jsdelivr.net/npm/@zeainc/zea-engine@3.11/dist/index.umd.js"></script>
```

```javascript
// Load the classes out of the global variable.
const { Scene, GLRenderer } = zeaEngine
```

### New code
```bash
npm install '@zeainc/zea-engine'
```

```javascript
// Import the classes from the installed module
import { Scene, GLRenderer } from '@zeainc/zea-engine'
```

We will continue to implement improvements in the typings and inline documentation. 
Our commitment to our users from this version forward is to maintain a stable, backwards compatible and developer friendly API. 


### ⚠ BREAKING CHANGES

* Canvas must now be nested under a another DOM element that it is resized to fit 100%
This addresses a circular relationship where the canvas width and height must be calculated
based on its parent, not on itself.

```css
#rendererHolder {
  width: 500;
  height: 300;
}
#renderer {
  width: 100%;
  height: 100%;
}
```

```html
<div id="canvasHolder">
  <canvas id="canvas"></canvas>
</div>
```

* The Scene Tree now contains only TreeItems. This means items such as Kinematic Solvers can no longer be added as children in the tree.

* Scene Settings has been removed, and its values migrated to either the Scene or the Viewport.


Old code
```javascript
const color = new Color('#E5E5E5')
scene.getSettings().getParameter('BackgroundColor').setValue(color)
```

New code
```javascript
const color = new Color('#E5E5E5')
renderer.getViewport().backgroundColorParam.value = color
```

* VertexAttributes are now typed. Adding Vertex Attributes to geometries now requires that the user constructs the appropriate typed attribute, then adds it to the geometry.

Old code
```javascript
const attr = geom.addVertexAttribute('foo', Vec3)
```

New code
```javascript
const attr = new Vec3Attribute()
points.addVertexAttribute('foo', attr)
```

* VertexAttribute values are no longer initialized to zero and must be explicitly initialized.

New code
```javascript
const line = new Lines()
line.setNumVertices(2)
line.setNumSegments(1)
line.setSegmentVertexIndices(0, 0, 1)
line.getVertexAttribute('positions').setValue(0, new Vec3(0, 0, 0))
line.getVertexAttribute('positions').setValue(1, new Vec3(0, 0, 1))
```


* VertexAttributes.length was removed and replaced with getCount

Old code
```javascript
const attr = geom.addVertexAttribute('foo', Vec3)
attr.length
```

New code
```javascript
const attr = new Vec3Attribute()
attr.getCount()
```

* Assets are now loaded using the 'load' method instead of using the 'FilePath' parameters.

Old code
```javascript
const objAsset = new ObjAsset('cow')
objAsset.getParameter('FilePath').setValue('data/cow.obj')
objAsset.on('loaded').then(() => {
  renderer.frameAll()
})
```

New code
```javascript
const objAsset = new ObjAsset('cow')
objAsset.load('data/cow.obj').then(() => {
  renderer.frameAll()
})
```

* EnvMap are now loaded using the 'load' method instead of using the 'FilePath' parameters.

Old code
```javascript
const envMap = new EnvMap()
envMap.getParameter('FilePath').setValue('data/pisa-webp.zenv')
envMap.on('loaded').then(() => {
  ...
})
```

New code
```javascript
const envMap = new EnvMap('cow')
envMap.load('data/pisa-webp.zenv').then(() => {
  ...
})
```

* EnvMap are now loaded using the 'load' method instead of using the 'FilePath' parameters.

Old code
```javascript
const image = new FileImage('albedo')
image.getParameter('FilePath').setValue('data/steelplate1-unity/steelplate1_albedo.webp')
image.on('loaded').then(() => {
  ...
})
```

New code
```javascript
const image = new FileImage('albedo')
image.load('data/steelplate1-unity/steelplate1_albedo.webp').then(() => {
  ...
})
```

* getSelectable was renamed to isSelectable 

Old code
```javascript
const geomItem = new GeomItem('foo')
geomItem.getSelectable()
```

New code
```javascript
const geomItem = new GeomItem('foo')
geomItem.isSelectable()
```

* GLShader.getParamDeclarations was replaced with getMaterialTemplate 
getParamDeclarations would return an array of parameter descriptors, but now we return an instance of a Material from getMaterialTemplate instead.

Old code
```javascript
  static getParamDeclarations() {
    const paramDescs = super.getParamDeclarations()
    paramDescs.push({
      name: 'BaseColor',
      defaultValue: new Color(1.0, 1.0, 0.5),
    })
    return paramDescs
  }
```

New code
```javascript
  static getMaterialTemplate(): Material {
    const material = new Material()
    return material
  }
```



* Registry.getBlueprintName was Registry.getClassName 
The registry, which stores all class definitions, and a mapping to the names they were registered under, can be used to retrieve the registered name of a class instance.
Due to the strict typing of TypeScript, the interface needed to change. Instead of passing a class, you must pass the definition of the class to getClassName

Old code
```javascript
  const myClassInst = ...
  const className = Registry.getBlueprintName(myClassInst)
  console.log("className:", className)
```

New code
```javascript
  const myClassInst = ...
  const className = Registry.getClassName(Object.getPrototypeOf(myClassInst).constructor)
  console.log("className:", className)
```

* The deprecated Group class was removed from the build. You must now use one of the specialized classes based on BaseGroup. e.g. SelectionSet, or KinematicGroup.

### Features

* The engine and each library now logs it version to the console to let the user know the exact version of the engine or library that is installed.  ([8e35d43](https://github.com/ZeaInc/zea-engine/commit/8e35d43b9fbd18c2a73efaed86b9446122a51508))
```bash
Zea Engine v4.0.0
main.js:16 Registered lib '@zeainc/zea-ux' v4.0.0
main.js:16 Registered lib '@zeainc/zea-kinematics' v4.0.1
main.js:16 Registered lib '@zeainc/zea-potree' v4.0.0
```

* The entire engine was ported to TypeScript with TypeDefinitions now being bundled in the package. ([e949662](https://github.com/ZeaInc/zea-engine/commit/e949662cab88f2b8e799c51e4995229a73bfd10f))
* auto-position the canvas and its parent ([18b8a90](https://github.com/ZeaInc/zea-engine/commit/18b8a90d4b9da50e232dccc5d10cb1f8e773d5db))
* The engine now provides various statically defined Materials. This simplifies the process of assigning materials to Geometries, as the parameters are exposed as public properties. ([ae92d20](https://github.com/ZeaInc/zea-engine/commit/ae92d20fae158c4f4fbb746227bc4ce8f04ef494))
* zcad files when loading now construct statically defined materials when possible. ([4acad4e](https://github.com/ZeaInc/zea-engine/commit/4acad4e7aafd938aab58fa310a4e45be166f2cbd))

* Vec2, Vec3, Vec4, Quat, Color, Xfo, Mat3 and Mat4 parameters can now be encoded in zcad files. ([1b17f76](https://github.com/ZeaInc/zea-engine/commit/1b17f76c9cf390433d84232cbaaa1dc4c7235729))
* Parameters are now accessible directly on the class as public members.
* Parameter values are now accessible as a property via getter and setter.

```javascript
geomItem.getParameter('LocalXfo').setValue(xfo)
```

The new, more convenient access looks like the following.
```javascript
geomItem.localXfoParam.value = xfo
```

* SceneTree classes now all provide a .getClassName() method that returns the name of the class.  ([e949662](https://github.com/ZeaInc/zea-engine/commit/e949662cab88f2b8e799c51e4995229a73bfd10f

New code
```javascript
  const treeItem = new TreeItem()
  const className = treeItem.getClassName()
  console.log("className:", className)
```

### Bug Fixes

* Cutaways are now applied to GeomData and Highlight rendering so surfaces that are both highlighted and cutaway, the highlight is also cutaway.
* The GEOMITEM_INVISIBLE_IN_GEOMDATA is now being honored in the SimpleSurfaceShader and FlatSurfaceShader.
* A bug in our resize throttling caused incorrect canvas size. ([8d23702](https://github.com/ZeaInc/zea-engine/commit/8d23702b8b3834a0af81ef1fb4b070242dec062e))
* black flickering when resizing ([10005fa](https://github.com/ZeaInc/zea-engine/commit/10005fa0b36561821925606ef21e848a2297c6bb))
* FlatSurfaceShader now supports cutaways ([9a46e49](https://github.com/ZeaInc/zea-engine/commit/9a46e497b0172a3db63fb293432e3f5dbc016531))
* A bug in our resize throttling caused incorrect canvas size. ([8d23702](https://github.com/ZeaInc/zea-engine/commit/8d23702b8b3834a0af81ef1fb4b070242dec062e))
* Cleaned up silly bug in renderer. Geometries were continuously being uploaded to the GPU. ([c131a96](https://github.com/ZeaInc/zea-engine/commit/c131a96e9db624dfac2dc9ca8f066bbf202eae07))
* Fixed loading Obj files that contain a reference to a mtl file. Fixed parsing mtl files. ([b0ec4fe](https://github.com/ZeaInc/zea-engine/commit/b0ec4fe953989fa193bddaa2a043b9012c0b14d9))
* Fixed regression causing canvas size on to fix parent ([9522192](https://github.com/ZeaInc/zea-engine/commit/9522192f543885a217e0419374fb2666dfb74ad8))
* Fixed warning in React and error in Svelte by forcing the webWorkerLoader to assume a browser environment. ([3308c13](https://github.com/ZeaInc/zea-engine/commit/3308c13f3ebf9fc2cba19c9e3417b341bd891096))
* Implemented InstanceItem.clone so that as a tree is cloned, the instances are kept. ([8981248](https://github.com/ZeaInc/zea-engine/commit/89812483a37da89783a5217cb8d1706dd4cb0de3))
* Optimized memory used by the typescript build. Mostly by avoiding use of closures. ([c84ef65](https://github.com/ZeaInc/zea-engine/commit/c84ef65d1e48da96a7e5f46b0d183e04b8458360))
* Picking lines was broken after version 3.12.0. This is now addressed. ([952dadb](https://github.com/ZeaInc/zea-engine/commit/952dadb9e4402080869d8e909638be20a6e65073))
* Removed dependency on 'semver' as it was not abe to build a browser bundle friendly version ([1ce5a0d](https://github.com/ZeaInc/zea-engine/commit/1ce5a0deebf64ae7a47e67891d467b5707a2f9dd))
* MaterialGroup updateMaterials is no longer async ([0722336](https://github.com/ZeaInc/zea-engine/commit/072233662bbad8bc9c6acd53e4dae2374ae6b330))
* The Plane primitive faces were facing backwards which is now fixed. ([d85a3d7](https://github.com/ZeaInc/zea-engine/commit/d85a3d715ad8bc77e6d6180286fbaf6746fd75ac))
* Vec2,3 & 4 classes now more robustly check that constructor parameters are numeric ([26a07fb](https://github.com/ZeaInc/zea-engine/commit/26a07fbb9ec709ee7f240ad47f60792ac5e4a3c4))


## [3.12.5](https://github.com/ZeaInc/zea-engine/compare/v3.12.3...v3.12.5) (2021-11-03)

### Bug Fixes

* Vec2, Vec3, Vec4, Quat, Color, Xfo, Mat3 and Mat4 parameters can now be encoded in zcad files. ([1b17f76](https://github.com/ZeaInc/zea-engine/commit/1b17f76c9cf390433d84232cbaaa1dc4c7235729))
* A bug in our resize throttling caused incorrect canvas size. ([8d23702](https://github.com/ZeaInc/zea-engine/commit/8d23702b8b3834a0af81ef1fb4b070242dec062e))
* Fixed loading Obj files that contain a reference to a mtl file. Fixed parsing mtl files. ([b0ec4fe](https://github.com/ZeaInc/zea-engine/commit/b0ec4fe953989fa193bddaa2a043b9012c0b14d9))
* fixed regression causing canvas size on to fix parent ([9522192](https://github.com/ZeaInc/zea-engine/commit/9522192f543885a217e0419374fb2666dfb74ad8))
* Fixed warning in React and error in Svelte by forcing the webWorkerLoader to assume a browser environment. ([3308c13](https://github.com/ZeaInc/zea-engine/commit/3308c13f3ebf9fc2cba19c9e3417b341bd891096))
* Picking lines was broken after version 3.12.0. This is now addressed. ([952dadb](https://github.com/ZeaInc/zea-engine/commit/952dadb9e4402080869d8e909638be20a6e65073))
* Removed dependency on 'semver' ([1ce5a0d](https://github.com/ZeaInc/zea-engine/commit/1ce5a0deebf64ae7a47e67891d467b5707a2f9dd))

### [3.12.4](https://github.com/ZeaInc/zea-engine/compare/v3.12.3...v3.12.4) (2021-10-28)


### Bug Fixes

* Fixed warning in React and error in Svelte by forcing the webWorkerLoader to assume a browser environment. ([3308c13](https://github.com/ZeaInc/zea-engine/commit/3308c13f3ebf9fc2cba19c9e3417b341bd891096))
* Removed dependency on 'semver' ([1ce5a0d](https://github.com/ZeaInc/zea-engine/commit/1ce5a0deebf64ae7a47e67891d467b5707a2f9dd))

## [3.12.2](https://github.com/ZeaInc/zea-engine/compare/v3.11.1...v3.12.2) (2021-10-27)

### Features

### Bug Fixes

* Prevent GLBaseRenderer from resizing buffers to zero width or height. ([33983aa](https://github.com/ZeaInc/zea-engine/commit/33983aaf3c828437dbaca8532d8b4446a9b0c0c1))

## [3.12.1](https://github.com/ZeaInc/zea-engine/compare/v3.12.0...v3.12.1) (2021-10-27)


### Features

* Added support for parsing 'Property_SInt32', 'Property_UInt32', 'Property_Float32', values from zcad files. ([88b751e](https://github.com/ZeaInc/zea-engine/commit/88b751e435088ae32af24c2050d1d1487b957015))
* zcad files can now contain String Lists, used to store PMI Linked Entity paths. ([39f43c6](https://github.com/ZeaInc/zea-engine/commit/39f43c64a7414e034eb3d2710411923d91833064))
* zcad files can now contain BooleanParameters ([f4f0761](https://github.com/ZeaInc/zea-engine/commit/f4f0761795b6cfca446106331c0c031259c9a05d))


### Bug Fixes

* InstanceItem no longer tries to resolve an empty path. ([7fc1274](https://github.com/ZeaInc/zea-engine/commit/7fc127466f704c5d352cdade7b963ffe67315556))
* Prevent Safari iOS 14 from generating a float geom buffer. ([9d48867](https://github.com/ZeaInc/zea-engine/commit/9d48867bd5d1f550a1da657ce1fd33da803aace8))
* Removed explicit 'position: relative' style value applied to the Canvas as it broke layout of sibling elements. ([170c487](https://github.com/ZeaInc/zea-engine/commit/170c48753a29c1f6787c6fa9c12781cdeb615958))
* revert change to calculating canvas width to not use devicePixelRatio ([7df6bed](https://github.com/ZeaInc/zea-engine/commit/7df6bed817ab3622eea9ee07676a0bd678517d80))

## [3.12.0](https://github.com/ZeaInc/zea-engine/compare/v3.11.1...v3.12.0) (2021-10-19)

### Features

* 'FlatSurfaceShader' is now always rendering double-sided. ([f295714](https://github.com/ZeaInc/zea-engine/commit/f2957149f63b4ec3144fe0230a8e27d93e53b269))
* The engine now supports loading zcad files that contain non-orthogonal and uniform scaling within the tree. ([aaafa71](https://github.com/ZeaInc/zea-engine/commit/aaafa71a9a2e1dfa60b73d99d2d6de2ee1fe0b15))


### Bug Fixes

* Always re-render the geomdata fbe after a pass updates. ([b26f905](https://github.com/ZeaInc/zea-engine/commit/b26f905fcae47f90049b2565da3994b9d6a43b35))
* as billboard atlas is being re-generated. Skip images that have not loaded. ([684c712](https://github.com/ZeaInc/zea-engine/commit/684c7126c87ae6fdabce5b1ffcc262930b06b394))
* BillboardItems now correctly generate pointer events allowing mouse interactions on labels and billboards. ([26c854f](https://github.com/ZeaInc/zea-engine/commit/26c854f8739e420208c7a538c559b54d295a564c))
* During rapid resizing, the canvas element would be drawn black. This is now fixed by throttling the frequency we can resize the WebGL buffers. ([#501](https://github.com/ZeaInc/zea-engine/issues/501)) ([49d8aba](https://github.com/ZeaInc/zea-engine/commit/49d8aba7035b4c3547a508c57cf2ec5d463e5b12))
* FlatSurfaceShader now correctly masks the rasterized area when rendering geomdata and highlight buffer. ([f8e76ae](https://github.com/ZeaInc/zea-engine/commit/f8e76aeb563d25e18d6ab978f4acc6407d1a7b8b))
* Highlighting of transparent textured items now works reliably. ([7378f60](https://github.com/ZeaInc/zea-engine/commit/7378f60076ce6b7f482a3218125e2e916a775565))
* Mouse interactions work correctly again on Safari. ([df8d38e](https://github.com/ZeaInc/zea-engine/commit/df8d38e2dd6dad0ea2567c2ed621b2fcc08e98e1))
* removing an item from the renderer when it was highlighted could cause corruption. ([368c57f](https://github.com/ZeaInc/zea-engine/commit/368c57f8ac764e4a329c8cc08094c7073165d6cf))
* Safari now supports up to 8 passes. ([bc1bd81](https://github.com/ZeaInc/zea-engine/commit/bc1bd818955ff961a76a3a7d0e29346a4d449da3))
* textured geoms would continuously upload their data to the GPU as a 'clean' flag was not correctly being set. ([7814aa7](https://github.com/ZeaInc/zea-engine/commit/7814aa7093eb5621564c40e63c8b1c6d25435ed7))
* transparent geometries now correctly generate pointer events when the mouse or vr controller interacts with them. ([3068acb](https://github.com/ZeaInc/zea-engine/commit/3068acb0831ec80d9d26769b1dc19747600a7b09))
* when removing transparent items from the renderer, an exception was thrown as event listeners were unregistered. ([#517](https://github.com/ZeaInc/zea-engine/issues/517)) ([ce15e4a](https://github.com/ZeaInc/zea-engine/commit/ce15e4a394c87e6d063c0468513d75a1bf1c9c86))
* zcad files can not contain BooleanParameters ([f4f0761](https://github.com/ZeaInc/zea-engine/commit/f4f0761795b6cfca446106331c0c031259c9a05d))

## [3.11.1](https://github.com/ZeaInc/zea-engine/compare/v3.11.0...v3.11.1) (2021-09-22)

### Bug Fixes

* InstanceItem no longer clones the children of the source tree item. This means that CADPart or CADAssembly should always be found under an InstanceItem, where before you might find a CADBody or a GeomItem. 
* To keep compatibility with version < 3.11.0, the plugins.umd.js script has been re-added to the build with a deprecation warning. This allows code to load the plugins file and generate a warning instead of an error.


## [3.11.0](https://github.com/ZeaInc/zea-engine/compare/v3.10.6...v3.11.0) (2021-09-15)

### Notes:

For this release, the 'plugins' file is no longer being built and should be removed from your script tags.
The plugins are now bundled into the engine library and so the plugins tag should be simply removed 

```
<script src="https://cdn.jsdelivr.net/npm/@zeainc/zea-engine@3/dist/plugins.umd.js"></script>
```

### Features

* ZeaEngine now supports bundlers such as webpack or rollup. ([7696c09](https://github.com/ZeaInc/zea-engine/commit/7696c09b8ccbe4664db9b0342fce83d15531bedc))


### Bug Fixes
* Fixed memory leak in the GeomLibrary that caused memory to not be freed after loading zcad files. ([3fda57a](https://github.com/ZeaInc/zea-engine/commit/3fda57a8f7ed2aac41c992a11fde5bbc50a88b71))
* The Renderer would leak memory by not correctly releasing all handles to Materials, even after the material was removed from the Renderer. ([9964438](https://github.com/ZeaInc/zea-engine/commit/996443840dd37d4e5bcff85be77a762d82e0a3a1))
* [#482](https://github.com/ZeaInc/zea-engine/issues/482) - GeomData buffer can now be debugged on low end GPUs. ([#483](https://github.com/ZeaInc/zea-engine/issues/483)) ([0ded2f3](https://github.com/ZeaInc/zea-engine/commit/0ded2f39e6ee945be2033aa8dcaa3072d235f522))
* A regression was fixed that means that GLRenderer now honors the 'antialias' value if provided in the options object. ([fa38277](https://github.com/ZeaInc/zea-engine/commit/fa3827791ee60161ae0c072ccc0fde9976d3f143))
* Addressed an error where an XR session is started before any pointer events are sent to the viewport, meaning that no 'Active' viewport was set. Now simply defaulting to the first viewport. ([c5da48c](https://github.com/ZeaInc/zea-engine/commit/c5da48c074886f2100506c5a42fb4a7c339eea66))
* Based on feedback from the Chromium team, we now use a DEPTH24_STENCIL8 texture and render buffer when rendering silhouettes ([1d9c76a](https://github.com/ZeaInc/zea-engine/commit/1d9c76a1c5346aed2b85fa0cf3e79f743ed41258))
* Culling worker now knows when an items visibility is false, and can ignore from culling. ([4dbc545](https://github.com/ZeaInc/zea-engine/commit/4dbc5457be612d990595e5d57ee2b6aabf623e96))
* disabling Silhouettes on all low end devices to make Oculus Quest work. ([2da7fad](https://github.com/ZeaInc/zea-engine/commit/2da7fad387453607d66cfb79d5333a2c6d305762))
* FatPoints and FatLines now render correctly in XR sessions. The view scaling is now correctied to give the appropriate point size and line width. ([33e40c7](https://github.com/ZeaInc/zea-engine/commit/33e40c793bc4f5d202d2183c13a74e32e1b26c50))
* Geom picking is now more precise making smaller items easier to pick. ([4b70014](https://github.com/ZeaInc/zea-engine/commit/4b70014a4a5012dc1e9b53164f6e8ca26fe6966a))
* GeomItems loaded from zcad files now contain a precise bounding box. Previously this bounding box was approximate, and not precise enough for many scenarios. ([a92a3af](https://github.com/ZeaInc/zea-engine/commit/a92a3afc5f242c1cde55201dab740d99d201bd29))
* GLTexture2D now correctly infers the internalFormat for RGB format textures. ([7dcc181](https://github.com/ZeaInc/zea-engine/commit/7dcc181b26a81e27ea1072a8313aaa3ba118c51b))
* Label sorting was sometimes incorrect in small scenes  ([#495](https://github.com/ZeaInc/zea-engine/issues/495)) ([0100957](https://github.com/ZeaInc/zea-engine/commit/0100957979599fa9f7fd3577dff408744ab6a6bf))
* non-multidraw merged shader fix ([5cafdae](https://github.com/ZeaInc/zea-engine/commit/5cafdae1f0abdd864d1876b0ae83c90f0d602bed))
* Oculus Rift controllers are now correctly positioned and sized in VR. ([26bd25c](https://github.com/ZeaInc/zea-engine/commit/26bd25cbcae28ed518cd86af8809c570bab5f90c))
* On some VR devices, an error is thrown the first time XR session is launched as it had not yet detected the correct HMD. ([4def1e9](https://github.com/ZeaInc/zea-engine/commit/4def1e9c50da3d9765a9d0309ade12dfc2bfec84))
* Shader compiler now correctly handles diamond shaped import chain. ([#465](https://github.com/ZeaInc/zea-engine/issues/465)) ([eebf405](https://github.com/ZeaInc/zea-engine/commit/eebf405460f23c5975a31b996454d67eee3a25a4))
* Sphere surface became inverted after a resize. ([c210a34](https://github.com/ZeaInc/zea-engine/commit/c210a34eabd5a531c430b0c666503dbff16a619f))
* Surfaces no longer render black before EnvMap or textures have loaded. ([8e7f7e5](https://github.com/ZeaInc/zea-engine/commit/8e7f7e5eccf5a07928f8d7e6f04af7251a2ebf65))
* The Promise returned from VLHImage.load is now being correctly resolved or rejected. ([1eb4b16](https://github.com/ZeaInc/zea-engine/commit/1eb4b16ac6c49dc5f6878ebcb18cdf29fd34ba86))


### [3.10.6](https://github.com/ZeaInc/zea-engine/compare/v3.10.5...v3.10.6) (2021-07-02)


### Bug Fixes

* addressed regression drawing large scenes on iOS devices using the new multi-draw-emulation code path. ([e54ff55](https://github.com/ZeaInc/zea-engine/commit/e54ff557b3a962bbff7fd7830424764ff7389c84))
* Line picking fattening now works on Safari. ([dc2c65f](https://github.com/ZeaInc/zea-engine/commit/dc2c65fd3da7c548f62b1635734c9da630dda3e1))

### [3.10.5](https://github.com/ZeaInc/zea-engine/compare/v3.10.3...v3.10.5) (2021-07-01)

### Bug Fixes

* 'setSelectable' now dynamically updates the rendering of GeomItems to the geom data buffer. ([fb58d36](https://github.com/ZeaInc/zea-engine/commit/fb58d36bafcdde61bfde9a0f5d163d8123b67af5))
* Cleaned up PointerEvents emitted during VR Sessions. ([8ab20bb](https://github.com/ZeaInc/zea-engine/commit/8ab20bb56a4d629c3c03ffcecf66c402b0b0592d))
* LinesPicking filtering no longer applied in VR. ([0ccb93f](https://github.com/ZeaInc/zea-engine/commit/0ccb93f73c97b623423c7983ee0f7aa6991fca2b))
    
* camera panning in orthographic mode now correctly tracks the mouse pointer.
    
* CameraManipulator now maintains screen space geometry position under the mouse while mouse wheel zooming of orthographic cameras.

* Camera framing now uses GeomItem bounding box if the geometry has not yet been loaded.
    
* The frustum culling system now correctly culls items for orthographic cameras.
    
* Surface lighting in orthographic rendering is now consistent for geometry anywhere on screen. Shaders now use the camera zaxis as the view vector.

* Outline shader now adapts sensitivity on a per-pixel basis. This reduces moiré patterns seen on some background surfaces as the camera zoomed into a foreground object.

* Camera near and far planes are adjusted on view framing to fit the scene size. The auto near/far plane multipliers are now much more tightly fitting the scenes, which reduces moiré patterns seen on background surfaces.
    
* Camera framing would sometimes cause a corrupt camera matrix when framing on a CADAsset before the geometries were loaded.

* Silhouettes now have smoother graduations in darkness.

### [3.10.3](https://github.com/ZeaInc/zea-engine/compare/v3.10.2...v3.10.3) (2021-06-29)

### Bug Fixes

* Fix mixing multi-draw and non-multi-draw. ([49002b8](https://github.com/ZeaInc/zea-engine/commit/49002b851e28c46a40eec8972a15876601438fdd))
* Fixed FatPointsShader multi-draw code path. ([9c3debf](https://github.com/ZeaInc/zea-engine/commit/9c3debf25d28db052d4cb1417b8c6abf358d3a21))
* Fixed regression in PointsShader in multi-draw. ([3bb38e7](https://github.com/ZeaInc/zea-engine/commit/3bb38e78a4849a26deee59437e2d493a960a67c1))
* Fixed regression in FatLinesShader in multi-draw. ([a796d3a](https://github.com/ZeaInc/zea-engine/commit/a796d3a04ece5bf8c96320d9f53224e262e82f01))
* Fixed multi-draw code path for Firefox. ([ca88db3](https://github.com/ZeaInc/zea-engine/commit/ca88db3efa15d9561f616520ab64d7eaad6aee44))
* Fixed multi-draw code path for iOS. ([54ab89a](https://github.com/ZeaInc/zea-engine/commit/54ab89aa0be7391548c150d1ad456edc2077ec49))

## [3.10.0](https://github.com/ZeaInc/zea-engine/compare/v3.9.1...v3.10.0) (2021-06-16)


### Features

* Lines picking is now easier and more stable using a new line picking filter ([1471dc8](https://github.com/ZeaInc/zea-engine/commit/1471dc83e0928caa35c07931116fe03a32e3079e))
* proxy geometries loaded from zcad files now expose methods to determine the number of triangles and line segments. ([1437c72](https://github.com/ZeaInc/zea-engine/commit/1437c725eaa110cd9fc9cd66e4ca400db7b026a1))
* when loading assets, a new context class enables specifying the system units, paths to external resources, and other information. ([1b8aa4d](https://github.com/ZeaInc/zea-engine/commit/1b8aa4d599ea1d71e90ffc6770c98d723e931550))
* Implemented Vec2.intersectionOfLines and tests.
* TreeItem now supports a toggle to disable the bounding box calculation for its self and subtree.

### Bug Fixes

* Addressed exception rendering transparent geoms in VR. ([1a2f0bf](https://github.com/ZeaInc/zea-engine/commit/1a2f0bf7a4d54f9b0e5bfc7117823fc6019e92d1))
* Animated geometries are now correctly un-culled when they come back into the frustum. ([#431](https://github.com/ZeaInc/zea-engine/issues/431)) ([1b5806f](https://github.com/ZeaInc/zea-engine/commit/1b5806f7e04df8618caf65bec46b0518c52c05e9))
* calling setSelectable(false) on a GeomItem now configures its visibility in the GeomData buffer. ([1d7fbc4](https://github.com/ZeaInc/zea-engine/commit/1d7fbc4f73cee5736e8ebc1f7e060a18df4c20f1))
* culling frustum is now correctly reset to the regular viewport when exiting a VR session. ([47f4270](https://github.com/ZeaInc/zea-engine/commit/47f42703a39896e1596ce482fbdb336fe757a9bd))
* Lines are now easier to select by making the click zone more consistently fatter. ([09892b5](https://github.com/ZeaInc/zea-engine/commit/09892b5f6e14d18c24bddae7f2e6fe757a08d91d))
* Selection highlight in the engine conflicted with selection highlight in the UX library. Removing the engine implementation. ([b42f9d9](https://github.com/ZeaInc/zea-engine/commit/b42f9d9fb25c5d6558d74cd8e95719a2eb7a7c2f))
* To address a performance disparity on platforms where multi-draw is not supported, we now run an almost identical code path that emulates multi-draw. ([ef1222e](https://github.com/ZeaInc/zea-engine/commit/ef1222e3183e409179cad993c870a7adc3a4c3e3))
* CameraManipulator now modifies the Frustum hight value instead of moving the camera when dollying an orthographic camera.([3ac71e8](https://github.com/ZeaInc/zea-engine/pull/429/commits/3ac71e8deecec6d06ce2ad5dcfc1f564f179ef5f))
* Camera now frames more precisely on the scene geometry bounding boxes.

### [3.9.1](https://github.com/ZeaInc/zea-engine/compare/v3.9.0...v3.9.1) (2021-05-19)


### Bug Fixes

* Disabled drawing silhouettes on iOS as it relied on an extension unsupported on iOS. ([100c0f2](https://github.com/ZeaInc/zea-engine/commit/100c0f236c80e87c311d48e11c16a0d24e220bf5))

## [3.9.0](https://github.com/ZeaInc/zea-engine/compare/v3.8.0...v3.9.0) (2021-05-18)

### Features

* Camera near and far dist modulation can be disabled and configured. ([27c1999](https://github.com/ZeaInc/zea-engine/commit/27c19993e10be2c3bf372f3d52a83ad050cb55d8))
* CameraManipulator now supports two-fingered roll in tumbler or trackball manipulation modes. ([ca61cd1](https://github.com/ZeaInc/zea-engine/commit/ca61cd19bf178cfd835b05ee3bd4c7229ac38c77))
* CameraManipulator aim focus feature now has independent settings for double/single mouse clicks and double/single touch taps. ([b650fe6](https://github.com/ZeaInc/zea-engine/commit/b650fe6353af966ef3d5a68fcbb4bc61dcb24e6d))
* Cone and Sphere primitive constructors now provide options to not generate normals. ([5de65bc](https://github.com/ZeaInc/zea-engine/commit/5de65bc8167cd0b4e8fb5efe93c48f58a83e8e57))
* GeomItems can now be filtered from selectability with a simple boolean value 'visibleInGeomDataBuffer'. ([1a62f78](https://github.com/ZeaInc/zea-engine/commit/1a62f786c543f87ff6ae71f6d80f2f89f6c14e3b))
* Improved highlight rendering quality using Sobel Filter to detect borders. ([fabff57](https://github.com/ZeaInc/zea-engine/commit/fabff579a5c525b4e618a7624b74b8ae53a49529))
* LinesShader now provides controls for line stippling.The Shader allows specifying a stipple pattern for un-occluded lines separately from occluded lines. Used to achieve HiddenLine rendering modes. ([79875b8](https://github.com/ZeaInc/zea-engine/commit/79875b81b94ac7de4bbb868991f10ec0951adf4f))
* Renderer can now display a Silhouette around geometries, as part of the implementation of CAD style rendering modes. ([cf55227](https://github.com/ZeaInc/zea-engine/commit/cf552278e2a02d3cbc5451f6a922fc5c9e798977))
* SimpleSurfaceShader and StandardSurfaceShader compute face normals dynamically if not provided as vertex normals. ([4280b2c](https://github.com/ZeaInc/zea-engine/commit/4280b2c7ed5197ba0f975a751c401dadf54d15e1))
* Solid Angle Culling limit value can now be customized on the renderer. renderer.solidAngleLimit = 0.0 will disable culling based on the solid angle of an item. ([a1068b6](https://github.com/ZeaInc/zea-engine/commit/a1068b6a4bcb633f425e8002ac3d6d2742cf5fec))
* The default Orbit rate has been increased to 0.5 on Mobile devices. ([bcddfc1](https://github.com/ZeaInc/zea-engine/commit/bcddfc10496503f9181f1ec2189ece67780f3d3a))


### Bug Fixes

* Addressed an exception thrown then items were re-attached to different parts of the tree, and then had opacity changes. The renderer was not being correctly cleaned when an item was simply moved in the tree, leaving dangling event listeners. ([074574d](https://github.com/ZeaInc/zea-engine/commit/074574da3f8117aa5f6a4d7986376c6524b4505a))
* Camera view no longer pops as the start of manipulations of orthographic cameras. ([30bc147](https://github.com/ZeaInc/zea-engine/commit/30bc147063879ecca605d1223f90720baf4f772b))
* Items being removed and re-added to the renderer now are correctly updated in the frustum culling system. ([7dc5c90](https://github.com/ZeaInc/zea-engine/commit/7dc5c90fe64fb66a5fc64ec6c06689d7716868d4))
* Procedural geoms now correctly support lazily computing vertex normals and hard edge indices. Previously the geometries would not be updated automatically. ([aefc299](https://github.com/ZeaInc/zea-engine/commit/aefc29961c385dceaf108cf5d8e440556fc25e33))
* Screen space items like selection rectangles no longer get culled by the frustum culling system. ([ef49f56](https://github.com/ZeaInc/zea-engine/commit/ef49f56c4eb33f57167f4ca6458fdcf097638e78))
* The frustum culling system would incorrectly cull items at the sides of the screen if those items had very large bounding spheres. This was due to incorrect math calculating the solid angle of the items. ([b41fe82](https://github.com/ZeaInc/zea-engine/commit/b41fe82f760491de6bc8eabd8dc4c8d71cdc2cc9))
* Tightened view framing algorithm so that the the camera is moved to more closely fit the provided items. ([533444c](https://github.com/ZeaInc/zea-engine/commit/533444cacbeddc7148bb90909be77dbf25f30ab3))

## [3.8.0](https://github.com/ZeaInc/zea-engine/compare/v3.7.0...v3.8.0) (2021-04-29)

### Features

* Add `zeaEngine.packageJson` ([620f7ac](https://github.com/ZeaInc/zea-engine/commit/620f7ac543d6234a454691f79c8a0e8ac9a1f37f))

## [3.7.0](https://github.com/ZeaInc/zea-engine/compare/v3.6.0...v3.7.0) (2021-04-28)


### Features

* GeomItem can now calculate precise bounding boxes for geometries after loading a zcad file. ([fafdfe7](https://github.com/ZeaInc/zea-engine/commit/fafdfe730fc0d2761675570d8ce9cb684e45da0c))


### Bug Fixes

* GeomLibrary now correctly cleans up the culling worker when items are removed from the renderer. ([a5f8181](https://github.com/ZeaInc/zea-engine/commit/a5f8181b06b3e1649108c580c6d3de651a96b6b5))
* Mobile Safari touch ([575a430](https://github.com/ZeaInc/zea-engine/commit/575a43074a95d78bbae1ce53e9b972aabf41eb31))
* Removing transparent items from the renderer no longer causes a crash. ([8cf4b15](https://github.com/ZeaInc/zea-engine/commit/8cf4b159e6e849685619c0a054a48966c0a07590))
* Renderer now updates all instances of instanced geometries where topologies are changing. ([a7b5730](https://github.com/ZeaInc/zea-engine/commit/a7b573084507b96961990e18028fb78ae5bf7d71))

## [3.6.0](https://github.com/ZeaInc/zea-engine/compare/v3.5.2...v3.6.0) (2021-04-23)


### Features

* BaseImage now provides wrapping and filter params to the renderer. ([834949b](https://github.com/ZeaInc/zea-engine/commit/834949bd8e36e2b7cf35ee4b23f00a25313696b4))
* BillboardItem now provides a 'Pivot' parameter to control the center pivot of the billboard. ([6212ad2](https://github.com/ZeaInc/zea-engine/commit/6212ad2c2b941f6418d31e6a413f4ff87488b516))
* Camera now supports perspective and orthographic projections, and is able to interpolate between. ([1709f86](https://github.com/ZeaInc/zea-engine/commit/1709f861c8355b0a3dc841a3fb468b97a38dbc1a))
* CameraManipulator now orbits the user around the point under the cursor. ([c8dd77e](https://github.com/ZeaInc/zea-engine/commit/c8dd77e122a293005b3b3aab13ab780e8cceec56))
* GLRenderer now applies the touch-action: none rule to the canvas to prevent scrolling when interacting on the canvas on mobile devices. ([322b327](https://github.com/ZeaInc/zea-engine/commit/322b3278761cb38734f430a101abac89a4136f0d))
* Mouse wheel zooming now moves towards the point below the mouse, if the mouse pointer is over a geometry. ([4839f6e](https://github.com/ZeaInc/zea-engine/commit/4839f6e03d9e1993cfe71db8978e98c6a6b3a2ce))
* PointsShader now supports drawing GeomData and highlights. ([73455d0](https://github.com/ZeaInc/zea-engine/commit/73455d0cccf2cd20875e8afb774cc11ca45261a2))
* Renderer now calculates Frustum culling to reduce the number of drawn objects. ([859c83b](https://github.com/ZeaInc/zea-engine/commit/859c83ba2ea8c601b2e5fa8d5a309f482d91d652))
* StandardSurfaceShader now supports AmbientOcclusion textures. ([f8a7283](https://github.com/ZeaInc/zea-engine/commit/f8a728362d3c267530fe689c339ffd6e45fc1896))


### Bug Fixes

* An exception thrown when all the items for a geom were removed from a GLGeomItemSet, if there were highlighted items before. ([201952d](https://github.com/ZeaInc/zea-engine/commit/201952dbef09f759167e1f7b81e7e8eb4e0b7a64))
* Assigning a regular value to a Material parameter no longer removes the assigned texture. ([e536595](https://github.com/ZeaInc/zea-engine/commit/e536595306fee0cb646da5add0acae8aacde26a1))
* CameraManipulator would sometimes cause rolling when double tapping, leaving the user camera a bit crooked. ([a195b8f](https://github.com/ZeaInc/zea-engine/commit/a195b8f65fa06ac4073549b0f0535e5cf638d1b4))
* Canvas is now immediately resized to fit its parent container when the WebGL context is created, making renderer setup synchronous ([16f9fd7](https://github.com/ZeaInc/zea-engine/commit/16f9fd72d0f0801cb90cf5d3332ab15a1b59f07e))
* Cleaned up memory leak removing items from the renderer. ([d0e9438](https://github.com/ZeaInc/zea-engine/commit/d0e9438bc9cd4a0904ffa5065d0008acfc9606a5))
* Cutting Plane values on the BaseGeomItem are now initialized to reasonable values. ([08c61e7](https://github.com/ZeaInc/zea-engine/commit/08c61e7222b6a8487e2bda756eb5f3c32f249f90))
* done. ([a8b3c59](https://github.com/ZeaInc/zea-engine/commit/a8b3c5996654b2931f43ba623f745a83c0541d4c))
* In some cases lines would render over surfaces and appear to show through in some cases. ([9db725c](https://github.com/ZeaInc/zea-engine/commit/9db725c8875da096046aab3e97593ff30c72b692))
* indices in the renderer became broken after removing a geometry from the renderer. ([638037c](https://github.com/ZeaInc/zea-engine/commit/638037c9292125d84957190ffa7f8707b8bdd388))
* Items are no longer culled if their size, or matrix is calculated in the GPU. Addresses culling single points geometries and Xfo handles. ([fbd2b4f](https://github.com/ZeaInc/zea-engine/commit/fbd2b4f2db534cfed2945a5ccd15944b1914e36b))
* LinesShader opacity in multi-draw now matches opacity in regular drawing. ([29dcbf8](https://github.com/ZeaInc/zea-engine/commit/29dcbf8d8cd2a222ac242e0d6642e446e2d5c776))
* Removed a redundant caching mechanism in the resource loader that prevented re-loading data at the same URL. ([0f8f3e2](https://github.com/ZeaInc/zea-engine/commit/0f8f3e26814de84baa43ea34ee5d9b13d3e4cb1a))
* SimpleUniformBinding now correctly binds textures to uniform values, so all PBR parameters can now be textured. ([1fc68ae](https://github.com/ZeaInc/zea-engine/commit/1fc68ae312858cd106053be0ce914caaa4abcbf2))
* The Canvas size can now be resized to zero width or height without the renderer throwing exceptions. ([67b7a8c](https://github.com/ZeaInc/zea-engine/commit/67b7a8ce8584bb88b38275c4a9fbfb1815fe98cc))
* The Engine became incompatible with its plugins due to a variable rename. This fix puts back the old name to address this compatibility issue. ([4e7c444](https://github.com/ZeaInc/zea-engine/commit/4e7c444aac31af8edd6e26efc2d572b2da939bc6))
* Visibility changes on transparent items now trigger re-sorting of items. ([9726a28](https://github.com/ZeaInc/zea-engine/commit/9726a289dda60545fc046fbac55b123987d049a3))

### [3.5.2](https://github.com/ZeaInc/zea-engine/compare/v3.5.1...v3.5.2) (2021-03-26)


### Bug Fixes

* A redraw is now correctly triggered after a GeomItem visibility changes. ([1cfe32d](https://github.com/ZeaInc/zea-engine/commit/1cfe32d90c12e0abf843a18f8485bdb038b3267d))
* Adding passes to the renderer would cause subsequent pass indexes to become broken. e.g. Adding a new pass would break the Overlay pass and then Handles would not work. ([e3f8354](https://github.com/ZeaInc/zea-engine/commit/e3f83546dc333b3871e4ef6fbc83810d52c033dd))
* Addressed major performance issue in the GLGeomItemSetMultiDraw as it was registering too many listeners to the GLGeomLibrary. ([329fa6d](https://github.com/ZeaInc/zea-engine/commit/329fa6d991df72f0e70e2948b5c232a5f4729fd0))
* GeomIds can now be correctly visualized again by passing { debugGeomIds: true } to the renderer constructor ([8fe65ef](https://github.com/ZeaInc/zea-engine/commit/8fe65ef9dc245e6f5b0f5980ecbd20a1aaa1543f))
* MouseWheel zooming is more smooth now and merges multiple events into a single motion. ([5e862ca](https://github.com/ZeaInc/zea-engine/commit/5e862cad301b5ec7a4a2d0335cbb9df993a6cac0))
* The ZEA Splash image is now removed. ([5b4f82f](https://github.com/ZeaInc/zea-engine/commit/5b4f82f68fd72a9db109295ec30e813095147f79))


### [3.5.1](https://github.com/ZeaInc/zea-engine/compare/v3.5.0...v3.5.1) (2021-03-23)


### Bug Fixes

* Correctly disable PBR on WebGL1. Only affects Safari browsers. ([c31af3d](https://github.com/ZeaInc/zea-engine/commit/c31af3d516fee805bbf98affb66bb771a2f51436))

## [3.5.0](https://github.com/ZeaInc/zea-engine/compare/v3.4.0...v3.5.0) (2021-03-22)


### Features

* The Renderer now request a high-peformance WebGL context by default. ([154d524](https://github.com/ZeaInc/zea-engine/commit/154d5245a43d16b51a2adf700161ce8cb70b298b))


### Bug Fixes

* Alpha in macOS ([3f2f383](https://github.com/ZeaInc/zea-engine/commit/3f2f3838fbe861d8c4ca36bae90d42893e076764))

## [3.4.0](https://github.com/ZeaInc/zea-engine/compare/v3.3.2...v3.4.0) (2021-03-21)


### Features

* GLPass classes can now pack and extract extra data in the GoemData shader and return data in pointer events. ([930f88a](https://github.com/ZeaInc/zea-engine/commit/930f88a59eabcb5e113d6f24e13c851fc26dc8da))


### Bug Fixes

* Async class is no longer used, and now removed from the engine. ([dd5892c](https://github.com/ZeaInc/zea-engine/commit/dd5892c4a44921a34374245af02b33f0f06fda8e))
* Canvas resizing ([b923fb0](https://github.com/ZeaInc/zea-engine/commit/b923fb02644e4efea0ff799c84241917053bad54))

### [3.3.2](https://github.com/ZeaInc/zea-engine/compare/v3.3.1...v3.3.0) (2021-03-16)

### Bug Fixes

* An exception was thrown in the Renderer if an empty geometry was added. Clearing a geometry would leave fragmented empty allocations in the GPU buffers. ([9f5c05d](https://github.com/ZeaInc/zea-engine/commit/9f5c05d012f88db3bf3e079a91932d6b9d82d12c))

## [3.3.0](https://github.com/ZeaInc/zea-engine/compare/v3.2.1...v3.3.0) (2021-03-09)


### Features

* The PBR Lighting pipeline was completely overhauled. The BRDF and HDR image convolution rewritten, and now the Materials match closely those of other PBR renderers such as Unity, Marmoset, and Filament.
* emission now enables causing an object to become completely transparent by lerping off the specular effect. ([34ee061](https://github.com/ZeaInc/zea-engine/commit/34ee06108f87959f6aaed01162250c8b3b3841c9))
* EnvMap convolution quality is now modulated by the detected performance of the GPU. ([8023088](https://github.com/ZeaInc/zea-engine/commit/80230887bdd9586f660c2e034bb079996b54907e))
* Normal Mapping now works well with the new PBR lighting pipeline. ([a7b1f2e](https://github.com/ZeaInc/zea-engine/commit/a7b1f2eb70556dcbc0c5debfbfb0a5a72e70cdf0))
* Transparent objects now use multi-draw ([d49148d](https://github.com/ZeaInc/zea-engine/commit/d49148df215876bb52ee45e847395b53954f5a1c))
* GLShader now generates far nicer formatted error messages. No longer dumping out the entire GLSL code for the shader, instead just the culprit line and a few surrounding lines. ([5af69e3](https://github.com/ZeaInc/zea-engine/commit/5af69e3606e50c52ec53deab1ee2cf697d38000d))
* added Color.addInPlace function. ([470c701](https://github.com/ZeaInc/zea-engine/commit/470c701e771bcfa7d494b2aa7c24e51ef0717741))
* Assets now support a simpler interface for loading data. Simply: Asset.load(url).then(...) ([2caee89](https://github.com/ZeaInc/zea-engine/commit/2caee8975addd1a07d6143ecac62a0307ba4883c))



### Bug Fixes

* Adding a custom highlight multiple times in a tree now does not cause multiple highlightChanged events ([ea03bfa](https://github.com/ZeaInc/zea-engine/commit/ea03bfae181caeb81fa7b2b08b0fff83ab9bd237))
* Addressed error message:  Two textures of different types use the same sampler location ([ea3d354](https://github.com/ZeaInc/zea-engine/commit/ea3d354f84e06d779714d1e0940ebd64107ab8a9))
* Addressed error on Safari due to navigator.hardwareConcurrency being unavailable. ([ff846f4](https://github.com/ZeaInc/zea-engine/commit/ff846f4d0d4a0cd8ec3af4f39f831cc9f73a27f1))
* Addressed regression in test where fat lines and thin lines are rendered from the same lines geometry. ([f401aba](https://github.com/ZeaInc/zea-engine/commit/f401abab05d206975482d6100715237953c352d4))
* All GPU geometries are now lazily uploaded to the GPU during rendering. Fixes issue where sometimes mesh rendered without the correct geometry data after an update to the Mesh. ([824351f](https://github.com/ZeaInc/zea-engine/commit/824351f33962cf9b3d34297505b21e0ea55b4c71))
* Cleaned up detection of transparency. Should be much faster now. ([ad6b1b0](https://github.com/ZeaInc/zea-engine/commit/ad6b1b03eaa091f0682c480fff6e3659cfe274dc))
* Color.equal deprecated in favor of Color.isEqual. ([385c9e6](https://github.com/ZeaInc/zea-engine/commit/385c9e63c2ba8b5b8887104514c56972450ef7c5))
* Fixed incorrect deprecation of equal method in Vec3. ([c729d2a](https://github.com/ZeaInc/zea-engine/commit/c729d2a92bb087c0e26e16d06974050856108658))
* Fixed minor regression running the engine on Safari devices. ([d3c082b](https://github.com/ZeaInc/zea-engine/commit/d3c082b08239aef9e468b44958ee576b004ae0f0))
* GeomData shader was left bound between multi-draw and regular drawing causing warning to be emitted as the 'multi-draw' vertex attribute bindings were still being used. ([30af594](https://github.com/ZeaInc/zea-engine/commit/30af5943b5eb34dc6ed8ff7cc3fce4568d3fccfd))
* If a material became transparent due to baseColor alpha value change, and then the opacity was changed, it would incorrectly determined as opaque. ([53772c7](https://github.com/ZeaInc/zea-engine/commit/53772c7aa1bb43a70baa10539c2de14fe0bc1cb0))
* Materials loaded from zcad files were not being detected as transparent, even if they had transparent parameters. ([f6c997d](https://github.com/ZeaInc/zea-engine/commit/f6c997d544ae797f3eea37c4c81410802fca1799))
* Normalized mouse wheel movements across browsers. Firefox mouse wheel zooming now works as in Chrome. ([ea443b0](https://github.com/ZeaInc/zea-engine/commit/ea443b0c928b35e6c97ce038482a9020ea5932e6))
* ObjeAsset did not need to create its own Material and Geometry libraries as the base class already does this. ([49fa075](https://github.com/ZeaInc/zea-engine/commit/49fa0750bd6d8b2d690123b966771d641ac65201))
* Procedural Sphere was generating texture coordinates with artifacts. ([999ce15](https://github.com/ZeaInc/zea-engine/commit/999ce155a3e16e7a52f65ff8d2dfd413e61291f5))
* Touch event listeners are now registered as passive listeners, which resolves a nagging warning message in Chrome. ([19e4aa6](https://github.com/ZeaInc/zea-engine/commit/19e4aa6afa815ba2f9cba376aafc54e54bb8e642))

## [3.2.0](https://github.com/ZeaInc/zea-engine/compare/v3.0.1...v3.2.0) (2021-02-08)


### Features

* Added Color#addInPlace ([58a9953](https://github.com/ZeaInc/zea-engine/commit/58a99534e91ff20cefbb68c06173ea43f9a01fa8))
* CameraManipulator#setDefaultManipulationMode generates a useful error message if an invalid value is passed ([2cbde30](https://github.com/ZeaInc/zea-engine/commit/2cbde3026767a01c4660778b2b838288733bda8e))
* Due to a change in behavior in Chrome which caused a pause launching the renderer, xrCompatible is now set to false by default. The GL canvas is converted to an XR canvas when an XR device is detected, so no change in behavior should be noticed. ([e5f1ee0](https://github.com/ZeaInc/zea-engine/commit/e5f1ee00b6b5165b02a7d55e0df8cb5558eb3da2))
* GLShader now generates far nicer formatted error messages. No longer dumping out the entire GLSL code for the shader, instead just the culprit line and a few surrounding lines. ([d8b219b](https://github.com/ZeaInc/zea-engine/commit/d8b219b223833dfed1e3484afa8f637d63a19959))
* As geometries are streamed, the bounding box for the tree is now valid as we pre-load the bounding boxes for the geometries into the tree. ([9017f08](https://github.com/ZeaInc/zea-engine/commit/9017f08141eed2c84c23e87d60fbbf93ac584f43))
* CameraManipulator now calls 'setCapture' to avoid redundant geom data rendering during camera movements. ([6134bdd](https://github.com/ZeaInc/zea-engine/commit/6134bddd8c51f28eb149b7fb67101cda6f49e6e5))
* GridTreeItem is now exported for use outside the engine. ([9a5bfc7](https://github.com/ZeaInc/zea-engine/commit/9a5bfc72e0f25e822fbe21a0b120fe07bfdec41f))
* Draw shaders now support debugging of geom Id to verify how effective instancing has been. ([5b87975](https://github.com/ZeaInc/zea-engine/commit/5b87975b2031a39345d25b7a1baa23bba23b400c))
* Pointer events are now emitted from the VRViewport based on interactions with VR controller ([426a153](https://github.com/ZeaInc/zea-engine/commit/426a153c7c748efec022a0b56649c7b6c2f65e6e))
* Implemented support for spectator mode in VR. ([23fdbec](https://github.com/ZeaInc/zea-engine/commit/23fdbecd1d3a4ace576bdb3eed3d0791c5e68855))
* Implemented a 1D Allocator for managing 2d arrays packed into a single 1D Array. ([b37bcca](https://github.com/ZeaInc/zea-engine/commit/b37bccaf2212b4829c32f3b07c32e5354c123a22))
* Initializing VR Stage below the active viewport position. ([ac6c5f2](https://github.com/ZeaInc/zea-engine/commit/ac6c5f2ab2f56ccc928d37528d6282be5c09f22e))
* Material now tracks state to check if a a texture has been assigned, or if it has become transparent. ([7914eac](https://github.com/ZeaInc/zea-engine/commit/7914eacff2c47ca990a04418da35e9bc48221717))
* Multi-draw pipeline now supports lines and points, and also non-32bit attr values. ([0553692](https://github.com/ZeaInc/zea-engine/commit/055369255d2284e94e8455019cd8b30fb5143780))
* Resizing a GLFbo now causes its bound color texture to be resized. ([29359c3](https://github.com/ZeaInc/zea-engine/commit/29359c3dd4578927f6740d8ed9498671a1b2e6a0))
* Resource loader now supports loading binary files via a new plugin ([#309](https://github.com/ZeaInc/zea-engine/issues/309)) ([adc5f1c](https://github.com/ZeaInc/zea-engine/commit/adc5f1c1012ff1b9a84b2a49b0cf4f9fd718f015))


### Bug Fixes

* Cloning NumberParameter or MaterialFloatParam now properly clones the range and step values. ([ad4eefd](https://github.com/ZeaInc/zea-engine/commit/ad4eefd0d98ddd00ebd44665ce7910290c5d3a3c))
* Labels are now lazily updated on the next draw, instead of waiting on a timeout. This means we should no longer have frames where labels disappear/reappear. ([740d42c](https://github.com/ZeaInc/zea-engine/commit/740d42c78d25c907ac9add392276b2ad9ad568d6))
* PointGrid was not correctly generating its geometry after changes to procedural geometries in the previous release.([70e7c46](https://github.com/ZeaInc/zea-engine/commit/70e7c460d8f1637cdfc3af4848d72f7ffe2a1672))
* Cleaned up regressions in the VRViewTool for VR navigation([fe3b656](https://github.com/ZeaInc/zea-engine/commit/fe3b656e5af0c84c9afbf02ec7ab5ad98c701b9a))
* CameraManipulator WASD walk keys were left on when the mouse left the viewport. ([5edd614](https://github.com/ZeaInc/zea-engine/commit/5edd6140e69b6e5ca31862d19164419d20dab9ea))
* VLAAsset was not correctly reporting progress when loading streaming geoms. ([9c828c3](https://github.com/ZeaInc/zea-engine/commit/9c828c3ac1d3e43ebaabeec12763fc58811c2c82))
* ObjAsset was not able to correctly load objects made up of groups. ([ef1d92b](https://github.com/ZeaInc/zea-engine/commit/ef1d92b50062538af67d1b86207ff38ff43b8e1f))
* Viewports can now be initialized after the scene is already assigned to the renderer. Needed for XRViewports. ([a6fbb5c](https://github.com/ZeaInc/zea-engine/commit/a6fbb5cdd09d0397af120e94acd7ce5ffd8772a4))


### [3.0.1] (2020-12-04)


### Bug Fixes

* Fixed property detection on GLLines ([dc2d474](https://github.com/ZeaInc/zea-engine/commit/dc2d474c76f1e77c69204ae8bd2a5aa8ba3af1d4))

## [2.0.0] (2020-09-12)


### ⚠ BREAKING CHANGES

* **npm:** Raw imports are no longer supported.

### Features

* Added 'Overlay' option to LinesShader so lines can be rendered overlaid on scene geometries.
* Added support to make Points and Lines drawn as Overlay.
* SystemDesc now correctly detects RTX based GPUs.


### Bug Fixes

* Docs search now have their own namespace.
* Dynamic updates to lines topology now is reflected in the renderer.
* GeomProxy was missing a method to retrieve the bounding box, which caused regression when loading polygon meshes from zcad files.
* Updated Version class, deprecating old methods.
* Wasm file resolving from script tag.


### Build

* **npm:** Add UMD support.


## 1.3.0 (2020-08-20)


### Features

* Added PointSize parameter to PointsShader now that it's working in Chrome.
* Implemented new 'tumbler' manipulation mode on CameraMouseAndKeyboard manipulator to emulate the behavior of various CAD packages.
* TreeItem.resolvePath now throws an exception if the path cannot be resolved.


### Bug Fixes

* Regressions in the code for procedural lines and material parameter.
* Bug causing circle to throw exception when generating.
* Bug that prevented updating points geometry dynamically.
* Issues related to loading label packs in the labelManager.
* Regression in Group when using the 'manual' Initial Xfo mode.
* Regression in ObjLoader caused by changes to Mesh topology.
* Regressions in RouterOperator due to changes to OperatorOutputs map on Operator.
* Reverted Torus to simpler detail setting. Consistent with Sphere Cone, and Circle.
* Updated all snapshots with new output format.


## 1.2.0 (2020-08-14)


### Features

* Add footer for docs.
* Add GridTreeItem file and update Scene class.
* Added 'mouseOverGeom' and 'mouseLeaveGeom' events.
* Added basic cycle checking in the operator evaluation.
* Add isEqual and approxEqual to Xfo.
* Added splash screen to Zea Engine when loading.
* Implement 'addFace' on Mesh class to make it easier to setup meshes.
* Improved parameter dirtying when many multi-output operators are bound to many different parameters.
* Make the splash screen optional.
* No longer logging the SystemDesc on startup.
* Shaders can now provide a name to the constructor.


### Bug Fixes

* Cleaned up error messages being provided when throwing exceptions.
* Cleaned up dirty state vs clean state on Parameter.
* Duplicated createFromBuffer method on Color class.
* Wrong byteOffset on few classes.
* Debug script for Windows systems.
* Minor issue with the drawCount in the class GLMaterialGeomItemSets.
* Regression causing changes to materials to not trigger re-rendering.
* Regression in Potree due to GLGeom was no longer emitting a 'destructing' event.
* Geometry types are now registered with the SGFactory.
* Math type constructors need to be able to take a Float32Array as an argument.
* OperatorOutput now throws an error if trying to call 'getValue' before a param is connected.
* Operators now become dirty when adding Inputs and Outputs.
* Quat.setFrom2Vectors was incorrectly normalizing input vectors. Now assumes unit vectors are provided.
* Removed 'flags' implementation from Items.
* Removed 'flags' implementation on parameters and geometries, we're no longer using it.
* Replaced old sgFactory from GridTreeItem for Registry.
* Restored code that shouldn't be touched(Backwards compatibility).
* Restoring Box3 to default values in case axes are not numeric.
* Regressions in 'removeParameter' and 'replaceParameter'.
* Throwing errors instead of warnings in Registry class.
