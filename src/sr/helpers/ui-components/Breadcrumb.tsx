import { faAngleRight} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
// import Link from "next/link";
export const Breadcrumb = (props: any) => {
  return (
    <div className={`flow-root text-center ${props?.wrapperClassName}`}>
      {props.breadcrumbItems?.map((v: any, i: any) => (
        <div key={i} className={`mr-2 float-left font-semibold text-base ${props?.className}`}>
          {i != 0 &&
            <FontAwesomeIcon icon={faAngleRight} className="fas fa-angle-right px-[10px]" ></FontAwesomeIcon>
          }
          <span className={`${(v?.handleClick || v?.link) ? 'cursor-pointer border-[#4E83E4] text-[#4E83E4] border-b-2 ' : 'text-[#2F2F2F]'} `}
            onClick={v?.handleClick ? v.handleClick : undefined}
          >
            {(!v.handleClick && v?.link) ? <Link
              to={v.link}
              className=""
            >
              {v.label}
            </Link>
              :
              <span>{v.label}</span>
            }
          </span>
        </div>
      ))}
    </div>
  )
}

