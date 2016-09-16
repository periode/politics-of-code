using UnityEngine;
using System.Collections;

public class SpawningManager : MonoBehaviour {

	//PUBLIC VARIABLES
	public int numberOfRedAgents;
	public int numberOfBlueAgents;
	public int numberOfResources;

	public GameObject agent;
	public GameObject resource;

	// Use this for initialization
	void Start () {
		SpawnAgents ("Red", numberOfRedAgents);
		SpawnAgents ("Blue", numberOfBlueAgents);
		SpawnResources (numberOfResources);
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	void SpawnAgents(string type, int num){
		for(int i = 0; i < num; i++){
			Vector3 pos = new Vector3 (Random.Range (-20f, 20f), 0.6f, Random.Range (-20f, 20f));
			GameObject new_agent = (GameObject)Instantiate (agent, pos, Quaternion.identity);
			new_agent.tag = type;
		}
	}

	void SpawnResources(int num){
		for(int i = 0; i < num; i++){
			Vector3 pos = new Vector3 (Random.Range (-20f, 20f), 0.6f, Random.Range (-20f, 20f));
			GameObject new_agent = (GameObject)Instantiate (resource, pos, Quaternion.identity);
		}
	}
}
