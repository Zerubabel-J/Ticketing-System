import Swal from "sweetalert2";
const handleDelete = (articleId) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await api.delete(`/api/articles/${articleId}`);

        setArticles(articles.filter((article) => article._id !== articleId));

        Swal.fire("Deleted!", "Your article has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting article:", error);
        Swal.fire(
          "Error!",
          "There was a problem deleting the article.",
          "error"
        );
      }
    }
  });
};
