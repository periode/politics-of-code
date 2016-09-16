using UnityEngine;
using System.Collections;

public class WalkBehaviour : MonoBehaviour {

	//PUBLIC VARIABLES
	public float maxMovementSpeedFriend;
	public float maxMovementSpeedEnemy;
	public float maxMovementSpeedResource;

	public float minimumFriendDistance;
	public float minimumForeignerDistance;
	public float minimumResourceDistance;


	//PRIVATE VARIABLES





	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		float step;

		if(FindFriendPosition() != new Vector3(0, 0, 0)){
			step = maxMovementSpeedFriend * Time.deltaTime;
			this.transform.position = Vector3.MoveTowards (this.transform.position, FindFriendPosition (), step);
		}

		if(FindResourcePosition() != new Vector3(0, 0, 0)){
			step = maxMovementSpeedResource * Time.deltaTime;
			this.transform.position = Vector3.MoveTowards (this.transform.position, FindResourcePosition (), step);	
		}

	}

	Vector3 FindFriendPosition(){
		Vector3 target = new Vector3(0, 0, 0);
		GameObject[] friends = GameObject.FindGameObjectsWithTag (this.gameObject.tag);
		int closeFriends = 0;

		for(int i = 0; i < friends.Length; i++){
			if(Vector3.Distance(friends[i].transform.position, this.transform.position) < minimumFriendDistance){
				target += friends [i].transform.position;
				closeFriends++;
			}
		}

		target = (target/closeFriends);

		if (closeFriends != 0)
			return target;
		else
			return new Vector3(0, 0, 0);
	}

	Vector3 FindResourcePosition(){
		Vector3 averageResourcePosition = new Vector3(0, 0, 0);
		GameObject[] resources = GameObject.FindGameObjectsWithTag ("Resource");
		int closeResources = 0;

		for(int i = 0; i < resources.Length; i++){
			if(Vector3.Distance(resources[i].transform.position, this.transform.position) < minimumResourceDistance + resources[i].transform.localScale.x*0.85f){
				averageResourcePosition += resources [i].transform.position;
				closeResources++;
			}
		}

		averageResourcePosition = (averageResourcePosition/closeResources);

		return averageResourcePosition;
	}

}
