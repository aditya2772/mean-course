
import { Component,  OnDestroy,  OnInit } from "@angular/core";
import { Post } from "../post.model";
import { Subscription } from "rxjs";
import { PostsService } from "../posts.service";

@Component({
  selector:'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls:['./post-list.component.css']
})

export class PostListComponent implements OnInit,OnDestroy{
// posts=[
//   {title:'first post', content:'this is first post\'s content'},
//   {title:'second post', content:'this is second post\'s content'},
//   {title:'third post', content:'this is third post\'s content'}
// ];
 posts :Post[]=[];
 private postSub:Subscription;  // setting subsciption property to the private obje postSub




//dependcy injection to related to posts.service.ts file
constructor(public postsService:PostsService){}

ngOnInit(){
  this.postsService.getPosts();
  this.postSub= this.postsService.getPostUpdatedListner().subscribe((posts: Post[])=>{
    this.posts=posts;   //updating new value in posts
  });

}
//calling deletePost in delete method
onDelete(postId:string){
  this.postsService.deletePost(postId);
}

//use to prevent memory leak
ngOnDestroy(){
  this.postSub.unsubscribe();
}
}
