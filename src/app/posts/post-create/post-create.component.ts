import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
// import { Post } from "../post.model";
import { PostsService } from "../posts.service";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredTitle='';
  enteredContent='';
  // @output() is used to listen the event to outside


  constructor(public postsService:PostsService){}

  // two way binding code
  // onAddPost(){
  //   const post :Post={
  //     title: this.enteredTitle,
  //     content: this.enteredContent
  //   };
  //   this.postCreated.emit(post);
  // }

  // code of form angular validation
  onAddPost(form:NgForm){
    if (form.invalid) {
      return;
    }
    // const post :Post={
    //   title: form.value.title,
    //   content: form.value.content
    // };
    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
