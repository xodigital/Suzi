var es6Tests = (function() {
	return {
		init: function() {
			var odds = evens.map(v => v + 1);
			var nums = evens.map((v, i) => v + i);

			class SkinnedMesh extends THREE.Mesh {
			  constructor(geometry, materials) {
			    super(geometry, materials);

			    this.idMatrix = SkinnedMesh.defaultMatrix();
			    this.bones = [];
			    this.boneMatrices = [];
			    //...
			  }
			  update(camera) {
			    //...
			    super.update();
			  }
			  static defaultMatrix() {
			    return new THREE.Matrix4();
			  }
			}
		}
	};
})();
