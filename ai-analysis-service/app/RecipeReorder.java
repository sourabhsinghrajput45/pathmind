import java.util.Scanner;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.List;

class OrderSolver {

private int calculateLisLength(int[] arr) {
	if(arr == null || arr.length ==0)
    {
    return 0;
    }
    
    int[] tail = new int [arr.length];
    int maxLen = 0;
    
    for(int num : arr)
    {
    int low=0;
    int high = maxLen;
    
    while(low<high)
    {
    int mid = low+(high-low)/2;
    if(tail[mid] < num) {
    low=mid+1;
    }
    else{ high = mid }
    
    }
    
    if(low == maxLen) {
    tail[maxLen++] = num;
    }
    else
    {
    tail[low] = num;
    
    }
    }
    return maxLen;
   }
   
   public void solve(){
   Scanner s = new Scanner(System.in);
   int instructCount = s.nextInt();
   s.nextLine();
   
   s.nextLine();
   
   String[] shuffOrder = new String[instructCount];
   
   for(int i=0li<instructCount; i++)
   {
   shuffOrder[i] = s.nextLine().trim();
   }
   
   
   s.nextLine();
   
   String[] origOrder = new String [instructCount];
   
   for(int i=0; i<instructCount; i++)
   {
   origOrder[i] = s.nextLine().trim();
   }
   s.close();
   
   
   HashMap<String , Integer> posMap =  new HashMap <>();
   
   for(int i=0;i<instructCount; i++)
   {
   postMap.put(origOrder[i],i);
   }
   
   int[] idxSeq = new int[instructCount];
   for(int i=0; i<instructCount;i++)
   {
   idxSeq[i] = posMap.get(shuffOrder[i]);
   
   }
   
   int minOperations = instructCount - lisLength;
   System.out.println(minOperations);
   }
   
 }
 
 public class RecipeReorder {
 public static void main(String[] args)
 {
 new OrderSolver().solve();   
}

}