class checklist {
  constructor() {
    let t = this;
    t.input = document.createElement("input");
    t.input.setAttribute("type", "checkbox");
    Array.prototype.forEach.call(
      document.getElementsByClassName("checklist"),
      ulCheckList => {
        ulCheckList.style.listStyle = "none";
        let label = ulCheckList.getElementsByTagName("label")[0];
        label.setAttribute("for", ulCheckList.id);
        t.input.setAttribute("name", ulCheckList.id);
        ulCheckList.innerHTML = t.input.outerHTML + ulCheckList.innerHTML;
        Array.prototype.forEach.call(
          ulCheckList.getElementsByClassName("hascheck"),
          ulHasCheck => {
            ulHasCheck.style.listStyle = "none";
            let label = ulHasCheck.getElementsByTagName("label")[0];
            label.setAttribute("for", ulHasCheck.id + "_check");
            t.input.id = ulHasCheck.id + "_check";
            t.input.setAttribute("name", ulHasCheck.id);
            ulHasCheck.innerHTML = t.input.outerHTML + ulHasCheck.innerHTML;
            t.itemCheckInit(ulHasCheck);

            let ulHasCheckInput = ulHasCheck.querySelector("input");
            ulHasCheckInput.onclick = () => {
              let checked = ulHasCheckInput.checked;
              Array.prototype.forEach.call(
                ulHasCheckInput.parentElement.getElementsByTagName("input"),
                itemCheck => {
                  itemCheck.checked = checked;
                }
              );
              t.verify_checkeds(checked);
            };
          }
        );
        t.itemCheckInit(ulCheckList);

        ulCheckList.querySelector("input").onclick = function() {
          let checked = ulCheckList.querySelector("input").checked;
          Array.prototype.forEach.call(
            ulCheckList.getElementsByTagName("input"),
            ulHasCheck => {
              ulHasCheck.checked = checked;
            }
          );
        };
      }
    );
  }

  itemCheckInit(conteiner) {
    [].forEach.call(
      conteiner.getElementsByClassName("itemcheck"),
      itemCheck => {
        if (itemCheck.querySelector("input") !== null) {
          return;
        }
        itemCheck.style.listStyle = "none";
        let label = document.createElement("label");
        label.innerHTML = itemCheck.innerHTML;
        label.setAttribute("for", itemCheck.id + "_check");
        this.input.id = itemCheck.id + "_check";
        this.input.setAttribute("name", itemCheck.id);
        itemCheck.innerHTML = this.input.outerHTML + label.outerHTML;
      }
    );
    [].forEach.call(conteiner.getElementsByTagName("input"), itemCheck => {
      itemCheck.parentElement.addEventListener("change", () => {
        let checked = itemCheck.checked;
        let all = true;
        let any = false;
        let all_itemcheck = itemCheck.parentElement.parentElement.getElementsByClassName(
          "itemcheck"
        );
        Array.prototype.forEach.call(all_itemcheck, hc => {
          any = any || hc.querySelector("input").checked;
          all = all && hc.querySelector("input").checked;
        });
        if (all) {
          itemCheck.parentElement.parentElement.querySelector(
            "input"
          ).indeterminate = false;
          itemCheck.parentElement.parentElement.querySelector(
            "input"
          ).checked = true;
        } else {
          itemCheck.parentElement.parentElement.querySelector(
            "input"
          ).indeterminate = any;
          itemCheck.parentElement.parentElement.querySelector(
            "input"
          ).checked = false;
        }
        this.verify_checkeds(checked);
      });
    });
  }

  verify_checkeds(checked) {
    let all = false;
    Array.prototype.forEach.call(
      document.getElementsByClassName("hascheck"),
      element => {
        if (!element.querySelector("input").checked) {
          checked = false;
        } else {
          all = true;
        }
      }
    );
    let checklist_input = document.getElementsByClassName("checked");
    if (all) {
      checklist_input.indeterminate = !checked;
    } else {
      checklist_input.indeterminate = false;
      checklist_input.checked = false;
    }
    return checked;
  }
}
new checklist();
