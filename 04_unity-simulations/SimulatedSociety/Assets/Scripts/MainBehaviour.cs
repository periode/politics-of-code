using UnityEngine;
using System.Collections;

public class MainBehaviour : MonoBehaviour {

	public float maxHealth;
	public float hunger;
	public float feed;
	public float health;

	// Use this for initialization
	void Start () {
		if(this.tag == "Red"){
			this.GetComponent<Renderer> ().material.color = Color.red;
		}

		if(this.tag == "Blue"){
			this.GetComponent<Renderer> ().material.color = Color.blue;
		}

		health = maxHealth;
	}
	
	// Update is called once per frame
	void Update () {
		ResourceLevels ();

		Fight ();


		health = Mathf.Min (health, maxHealth);
		if(health < 0){
			Die ();
		}
	}

	void Fight(){
		// ???
	}

	void ResourceLevels(){
		health -= hunger;

		GameObject[] res = GameObject.FindGameObjectsWithTag("Resource");

		for(int i = 0; i < res.Length; i++){
			if(Vector3.Distance(this.transform.position, res[i].transform.position) < res[i].transform.localScale.x){
				health += feed;
			}
		}


	}

	void Die(){
		Destroy (this.gameObject);
	}
}
