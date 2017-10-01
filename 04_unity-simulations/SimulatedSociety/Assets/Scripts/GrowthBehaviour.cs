using UnityEngine;
using System.Collections;

public class GrowthBehaviour : MonoBehaviour {

	public float depletionRate;
	public float replenishRate;

	float resourceYield;

	// Use this for initialization
	void Start () {
		resourceYield = Random.Range (1, 3);
		this.GetComponent<Renderer> ().material.color = new Color (Random.Range (0.0f, 0.1f), Random.Range (0.4f, 0.8f), Random.Range (0.0f, 0.1f));
	}
	
	// Update is called once per frame
	void Update () {
		GameObject[] agents = GameObject.FindGameObjectsWithTag ("Red");

		for(int i = 0; i < agents.Length; i++){
			if (Vector3.Distance (agents [i].transform.position, this.transform.position) < this.transform.localScale.x)
				resourceYield -= depletionRate;
		}


		agents = GameObject.FindGameObjectsWithTag("Blue");

		for(int i = 0; i < agents.Length; i++){
			if (Vector3.Distance (agents [i].transform.position, this.transform.position) < this.transform.localScale.x)
				resourceYield -= depletionRate;
		}

		resourceYield += replenishRate*0.1f;


		this.transform.localScale = new Vector3((resourceYield), (resourceYield), (resourceYield));
	}
}
